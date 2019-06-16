/*
 * LoginFormAction.js
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

import InputFieldValidationService from "../../../service/validation/InputFieldValidationService";
import {MINIMUM_PASSWORD_LENGTH} from "../../../service/Constants";
import * as qs from "qs";
import {requestRestEndpoint} from "../../RestRequestAction";
import {HttpMethod} from "../../../middleware/HttpMethod";
import {AuthenticationType} from "../../../middleware/auth/AuthenticationType";
import {toggleLoginRegisterDialog} from "./LoginRegisterAction";

const EMAIL_FIELD_NAME = 'email';
const PASSWORD_FIELD_NAME = 'password';

export const CHANGE_EMAIL_FIELD = 'CHANGE_EMAIL_FIELD';
export const VALIDATE_EMAIL_FIELD = 'VALIDATE_EMAIL_FIELD';
export const CHANGE_PASSWORD_FIELD = 'CHANGE_PASSWORD_FIELD';
export const VALIDATE_PASSWORD_FIELD = 'VALIDATE_PASSWORD_FIELD';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_IS_LOADING = 'LOGIN_IS_LOADING';

export const changeLoginFormEmailField = (emailField, newValue) => {
    return {
        type: CHANGE_EMAIL_FIELD,
        emailField: {
            value: newValue,
            valid: true, // Always valid during changing, validation is done afterwards.
            validationRequired: true, // after first change by the user, validation is always required
            errorMessage: emailField.errorMessage,
            name: EMAIL_FIELD_NAME
        }
    }
};

export const validateLoginFormEmailField = (emailField) => {
    let validationResult = {
        valid: true,
        errorMessage: ''
    };
    if (emailField.validationRequired) {
        validationResult = InputFieldValidationService.validateEmail(emailField.value);
    }

    return {
        type: VALIDATE_EMAIL_FIELD,
        emailField: {
            value: emailField.value,
            valid: validationResult.valid,
            validationRequired: emailField.validationRequired,
            errorMessage: validationResult.errorMessage,
            name: EMAIL_FIELD_NAME
        }
    }
};

export const changeLoginFormPasswordField = (passwordField, newValue) => {
    return {
        type: CHANGE_PASSWORD_FIELD,
        passwordField: {
            value: newValue,
            valid: true, // Always valid during changing, validation is done afterwards.
            validationRequired: true, // after first change by the user, validation is always required
            errorMessage: passwordField.errorMessage,
            name: PASSWORD_FIELD_NAME
        }
    }
};

export const validateLoginFormPasswordField = (passwordField) => {
    let validationResult = {
        valid: true,
        errorMessage: ''
    };
    if (passwordField.validationRequired) {
        validationResult = InputFieldValidationService.validateInputLength(
            'password', passwordField.value, MINIMUM_PASSWORD_LENGTH
        );
    }

    return {
        type: VALIDATE_PASSWORD_FIELD,
        passwordField: {
            value: passwordField.value,
            valid: validationResult.valid,
            validationRequired: passwordField.validationRequired,
            errorMessage: validationResult.errorMessage,
            name: PASSWORD_FIELD_NAME
        }
    }
};

export const handleLogin = (username, password) => {
    return requestRestEndpoint({
        type: LOGIN,
        authenticationType: AuthenticationType.BASIC_AUTH,
        method: HttpMethod.POST,
        endpoint: process.env.AUTH_SERVER_URL + '/oauth/token',
        payload: qs.stringify({
            'grant_type': 'password',
            'username': username,
            'password': password,
        }),
        headers: {
            'Authorization': 'Basic ' + btoa(process.env.AUTH_SERVER_USER+':'+process.env.AUTH_SERVER_PASSWORD),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        error: {
            showErrorMessage: true,
            errorMessageText: 'The provided username or password are incorrect. Please try again.',
        },
        subsequentActions: {
            successActions: [toggleLoginRegisterDialog(true)],
            errorActions: []
        }
    });
};