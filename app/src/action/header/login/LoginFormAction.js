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

export const CHANGE_LOGIN_FORM_EMAIL_FIELD = 'CHANGE_LOGIN_FORM_EMAIL_FIELD';
export const VALIDATE_LOGIN_FORM_EMAIL_FIELD = 'VALIDATE_LOGIN_FORM_EMAIL_FIELD';
export const CHANGE_LOGIN_FORM_PASSWORD_FIELD = 'CHANGE_LOGIN_FORM_PASSWORD_FIELD';
export const VALIDATE_LOGIN_FORM_PASSWORD_FIELD = 'VALIDATE_LOGIN_FORM_PASSWORD_FIELD';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_IS_LOADING = 'LOGIN_IS_LOADING';

export const changeLoginFormEmailField = (emailField, newValue) => {
    let validationResult = {
        valid: emailField.valid,
        errorMessage: emailField.errorMessage
    };
    if (!validationResult.valid) {
        // during onChange do validation only when already invalid.
        validationResult = InputFieldValidationService.validateEmail(newValue);
    }

    return {
        type: CHANGE_LOGIN_FORM_EMAIL_FIELD,
        emailField: {
            value: newValue,
            valid: validationResult.valid,
            errorMessage: validationResult.errorMessage,
            name: EMAIL_FIELD_NAME
        }
    }
};

export const validateLoginFormEmailField = (emailField) => {
    const validationResult = InputFieldValidationService.validateEmail(emailField.value);

    return {
        type: VALIDATE_LOGIN_FORM_EMAIL_FIELD,
        emailField: {
            value: emailField.value,
            valid: validationResult.valid,
            errorMessage: validationResult.errorMessage,
            name: EMAIL_FIELD_NAME
        }
    }
};

export const changeLoginFormPasswordField = (passwordField, newValue) => {
    let validationResult = {
        valid: passwordField.valid,
        errorMessage: passwordField.errorMessage
    };
    if (!validationResult.valid) {
        // during onChange do validation only when already invalid.
        validationResult = InputFieldValidationService.validateInputLength(
            'password', newValue, MINIMUM_PASSWORD_LENGTH);
    }

    return {
        type: CHANGE_LOGIN_FORM_PASSWORD_FIELD,
        passwordField: {
            value: newValue,
            valid: validationResult.valid,
            errorMessage: validationResult.errorMessage,
            name: PASSWORD_FIELD_NAME
        }
    }
};

export const validateLoginFormPasswordField = (passwordField) => {
    const validationResult = InputFieldValidationService.validateInputLength(
            'password', passwordField.value, MINIMUM_PASSWORD_LENGTH);

    return {
        type: VALIDATE_LOGIN_FORM_PASSWORD_FIELD,
        passwordField: {
            value: passwordField.value,
            valid: validationResult.valid,
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