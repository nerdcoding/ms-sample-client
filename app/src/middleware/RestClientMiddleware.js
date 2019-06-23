/*
 * restClientMiddleware.js
 *
 * Copyright (c) 2019, Tobias Koltsch. All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 2 and
 * only version 2 as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/gpl-2.0.html>.
 */

'use strict';

import {REST_REQUEST} from "../action/RestRequestAction";
import * as axios from "axios";
import {REST_REQUEST_TIMEOUT} from "../service/Constants";
import {changeGlobalMessage} from "../action/GlobalMessageAction";
import {AuthenticationType} from "./auth/AuthenticationType";
import {HttpMethod} from "./HttpMethod";
import * as qs from "qs";
import {LOGOUT, LOGOUT_SUCCESS} from "../action/header/logout/LogoutAction";
import {LOGIN_SUCCESS} from "../action/header/login/LoginFormAction";

const BEARER_TOKEN_PREFIX = 'Bearer ';

/**
 * Middleware calls an REST endpoint if the provided action is a 'RestRequestAction' of the type 'REST_REQUEST'. If so,
 * the action contains all necessary information to call the REST endpoint.
 *
 * Also token handling is done. If the 'REST_REQUEST' needs a BEARER authentication, the access_token is fetched from
 * the store and will be provided as Authentication header.
 *
 * For the case that the access_token is invalid, so an 401 is returned by the server, we try to get a new access_token
 * with the refresh_token laying in the store. If the server send a new access_token we update the token on the store and
 * redo the current request.
 * If the server answers also answers with an 401 during token refresh (e.g. the refresh token is invalid), the user
 * is immediately logged out.
 * Finally when the server answers with an 403, that means someone tries an unauthorized access, the user is also
 * immediately logged out.
 */
export const restClientMiddleware = store => next => async action => {
    if (action[REST_REQUEST]) {
        let restRequest = action[REST_REQUEST];

        // Action indicates the begin of is loading.
        next({
            type: restRequest.type + '_IS_LOADING',
            isLoading: true
        });

        try {
            // Do HTTP request to REST endpoint.
            const response = await axios(createAxiosRequestConfig(restRequest, store));

            // Action indicates a success HTTP response.
            next({
                type: restRequest.type + '_SUCCESS',
                response: response.data
            });

            // Action shows success message (if needed).
            if (restRequest.success.showSuccessMessage) {
                next(changeGlobalMessage({
                    isError: false,
                    showMessage: true,
                    messageText: restRequest.success.successMessageText,
                    errorResponse: {}
                }));
            }

            // If there are any subsequent success actions.
            restRequest.subsequentActions.successActions.forEach(function (item) {
                next(item);
            });
        } catch (error) {
            if (isInvalidAccessToken(error) && restRequest.type !== LOGOUT) {
                handleTokenRefresh(error, store, next, action);
            } else if (isAuthenticationError(error) && restRequest.type !== LOGOUT) {
                doLogout(
                    store.getState().authentication.access_token,
                    store.getState().authentication.refresh_token,
                    next
                );
            } else {
                handleError(error, restRequest, next);
            }
        }

        // Action indicates the end of is loading.
        next({
            type: restRequest.type + '_IS_LOADING',
            isLoading: false
        });
    } else {
        return next(action);
    }
};

const createAxiosRequestConfig = (restRequest, store) => {
    const requestConfig = {
        method: restRequest.method,
        url: restRequest.endpoint,
        data: restRequest.payload,
        headers: restRequest.headers,
        timeout: REST_REQUEST_TIMEOUT
    };

    if (restRequest.authenticationType === AuthenticationType.BEARER) {
        requestConfig.headers['Authorization'] =
            BEARER_TOKEN_PREFIX + store.getState().authentication.access_token;
        requestConfig.access_token = store.getState().authentication.access_token;
        requestConfig.refresh_token = store.getState().authentication.refresh_token;
    }

    return requestConfig;
};

const isInvalidAccessToken = (error) => {
    let originalConfig = error.config;
    const status = error.response ? error.response.status : null;

    return status === 401
        && originalConfig.headers.Authorization.startsWith(BEARER_TOKEN_PREFIX)
        && originalConfig.refresh_token;
};

const isAuthenticationError = (error) => {
    const status = error.response ? error.response.status : null;
    return status === 401 || status === 403;
};

/**
 * Try to get a new access_token with the current refresh_token. If we got a new access_token, the store is updated
 * with this token and the original action is dispatched for an redo.
 * Otherwise the user is logged out.
 */
const handleTokenRefresh = (error, store, next, action) => {
    axios({
        method: HttpMethod.POST,
        url: process.env.AUTH_SERVER_URL + '/oauth/token',
        data: qs.stringify({
            'grant_type': 'refresh_token',
            'refresh_token': error.config.refresh_token
        }),
        headers: {
            'Authorization': 'Basic ' + btoa(process.env.AUTH_SERVER_USER+':'+process.env.AUTH_SERVER_PASSWORD),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: REST_REQUEST_TIMEOUT
    }).then(function(response) {
        if (response.data.access_token && response.data.refresh_token) {
            // Update token in store (and sessionStorage).
            next({
                type: LOGIN_SUCCESS,
                response: {
                    access_token: response.data.access_token,
                    refresh_token: response.data.refresh_token,
                    user_id: response.data.user_id,
                }
            });
            // Redo original action, with the now updated token from the store.
            store.dispatch(action);
        } else {
            doLogout(
                store.getState().authentication.access_token,
                store.getState().authentication.refresh_token,
                next
            );
        }
    }).catch(function(error) {
        doLogout(
            store.getState().authentication.access_token,
            store.getState().authentication.refresh_token,
            next
        );
    });

};

/**
 * Default error handler, shows a business error message or a technical error message.
 */
const handleError = (error, restRequest, next) => {
    if (restRequest.error.showErrorMessage) {
        // Action shows error message (if needed).
        next(changeGlobalMessage({
            isError: true,
            showMessage: true,
            messageText: restRequest.error.errorMessageText,
            errorResponse: error,
        }));
    }

    // If there are any subsequent error actions.
    restRequest.subsequentActions.errorActions.forEach(function (item) {
        next(item);
    });
};

/**
 * Try to invalidate access_ and refresh_token at the server and delete tokens from store (and SessionStorage).
 */
const doLogout = (accessToken, refreshToken, next) => {
    axios({
        method: HttpMethod.DELETE,
        url: process.env.AUTH_SERVER_URL + '/token' +
            '?accessToken=' + accessToken +
            '&refreshToken=' + refreshToken,
        headers: {
            'Authorization': 'Basic ' + btoa(process.env.AUTH_SERVER_USER+':'+process.env.AUTH_SERVER_PASSWORD)
        },
        timeout: REST_REQUEST_TIMEOUT
    }).then(function(response) {
        next({
            type: LOGOUT_SUCCESS
        });
    }).catch(function(error) {
        next({
            type: LOGOUT_SUCCESS
        });
    });
};