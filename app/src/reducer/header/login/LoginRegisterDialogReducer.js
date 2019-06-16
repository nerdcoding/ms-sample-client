/*
 * LoginRegisterReducer.js
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

import {TOGGLE_LOGIN_REGISTER_DIALOG, SWITCH_LOGIN_REGISTER_DIALOG_TAB} from "../../../action/header/login/LoginRegisterAction";
import {
    CHANGE_LOGIN_FORM_EMAIL_FIELD, CHANGE_LOGIN_FORM_PASSWORD_FIELD,
    LOGIN_IS_LOADING, VALIDATE_LOGIN_FORM_EMAIL_FIELD, VALIDATE_LOGIN_FORM_PASSWORD_FIELD
} from "../../../action/header/login/LoginFormAction";
import {
    handleLoginIsLoadingReducer,
    loginFormReducer
} from "./LoginFormReducer";

const initialState = {
    isOpen: false,
    selectedTab: 0,
    loginForm: {
        emailField: {
            value: '',
            valid: true,
            validationRequired: false,
            errorMessage: '',
            name: 'email'
        },
        passwordField: {
            value: '',
            valid: true,
            validationRequired: false,
            errorMessage: '',
            name: 'password'
        },
        onLoginLoading: false
    }
};


export const loginRegisterDialogReducer = (state=initialState, action) => {
    switch (action.type) {
        case TOGGLE_LOGIN_REGISTER_DIALOG:
            return isOpenReducer(state, action);
        case SWITCH_LOGIN_REGISTER_DIALOG_TAB:
            return selectedTabReducer(state, action);
        case CHANGE_LOGIN_FORM_EMAIL_FIELD:
        case VALIDATE_LOGIN_FORM_EMAIL_FIELD:
        case CHANGE_LOGIN_FORM_PASSWORD_FIELD:
        case VALIDATE_LOGIN_FORM_PASSWORD_FIELD:
            return {
                ...state,
                loginForm: loginFormReducer(state.loginForm, action)
            };
        case LOGIN_IS_LOADING:
            return {
                ...state,
                loginForm: handleLoginIsLoadingReducer(state.loginForm, action)
            };
        default:
            return state;
    }
};

const isOpenReducer = (state, action) => {
    if (!action.isOpen) {
        return {
            ...state,
            isOpen: !action.isOpen
        }
    }

    return initialState; // when closed reinitialize state.
};

const selectedTabReducer = (state, action) => {
    return {
        ...state,
        selectedTab: action.selectedTab
    }
};

