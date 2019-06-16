/*
 * LoginFormReducer.js
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

import {
    CHANGE_LOGIN_FORM_EMAIL_FIELD, CHANGE_LOGIN_FORM_PASSWORD_FIELD,
    LOGIN_IS_LOADING, VALIDATE_LOGIN_FORM_EMAIL_FIELD, VALIDATE_LOGIN_FORM_PASSWORD_FIELD
} from "../../../action/header/login/LoginFormAction";

export const loginFormReducer = (loginForm, action) => {
    switch (action.type) {
        case CHANGE_LOGIN_FORM_EMAIL_FIELD:
        case VALIDATE_LOGIN_FORM_EMAIL_FIELD:
            return {
                ...loginForm,
                emailField: {
                    value: action.emailField.value,
                    valid: action.emailField.valid,
                    validationRequired: action.emailField.validationRequired,
                    errorMessage: action.emailField.errorMessage,
                    name: action.emailField.name
                }
            };
        case CHANGE_LOGIN_FORM_PASSWORD_FIELD:
        case VALIDATE_LOGIN_FORM_PASSWORD_FIELD:
            return {
                ...loginForm,
                passwordField: {
                    value: action.passwordField.value,
                    valid: action.passwordField.valid,
                    validationRequired: action.passwordField.validationRequired,
                    errorMessage: action.passwordField.errorMessage,
                    name: action.passwordField.name
                }
            };
        default:
            return loginForm;
    }
};

export const handleLoginIsLoadingReducer = (loginForm, action) => {
    if (action.type === LOGIN_IS_LOADING) {
        return {
            ...loginForm,
            onLoginLoading: action.isLoading
        }
    }

    return loginForm;
};