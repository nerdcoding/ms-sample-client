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
    CHANGE_EMAIL_FIELD,
    HANDLE_LOGIN_ERROR, HANDLE_LOGIN_IS_LOADING,
    HANDLE_LOGIN_SUCCESS,
    VALIDATE_EMAIL_FIELD
} from "../../../action/LoginFormAction";

export const loginFormReducer = (loginForm, action) => {
    switch (action.type) {
        case CHANGE_EMAIL_FIELD:
        case VALIDATE_EMAIL_FIELD:
            return {
                ...loginForm,
                emailField: {
                    value: action.emailField.value,
                    valid: action.emailField.valid,
                    validationRequired: action.emailField.validationRequired,
                    errorMessage: action.emailField.errorMessage,
                    name: action.emailField.name
                }
            }
    }
};


export const handleLoginSuccessReducer = (loginForm, action) => {
    if (action.type === HANDLE_LOGIN_SUCCESS) {
        return {
            ...loginForm,
            access_token: action.access_token
        }
    }

    return loginForm;
};
export const handleLoginErrorReducer = (loginForm, action) => {
    if (action.type === HANDLE_LOGIN_ERROR) {
        return {
            ...loginForm,
            globalErrorMessage: 'Global error'
        }
    }

    return loginForm;
};
export const handleLoginIsLoadingReducer = (loginForm, action) => {
    if (action.type === HANDLE_LOGIN_IS_LOADING) {
        return {
            ...loginForm,
            onLoginLoading: action.onLoginLoading
        }
    }

    return loginForm;
};