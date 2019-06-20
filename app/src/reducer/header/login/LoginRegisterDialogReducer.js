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
import {
    CHANGE_REGISTER_FORM_DAY_OF_BIRTH_FIELD,
    CHANGE_REGISTER_FORM_EMAIL_FIELD,
    CHANGE_REGISTER_FORM_FIRST_NAME_FIELD,
    CHANGE_REGISTER_FORM_GENDER_FIELD,
    CHANGE_REGISTER_FORM_LAST_NAME_FIELD,
    CHANGE_REGISTER_FORM_PASSWORD_FIELD,
    CHANGE_REGISTER_FORM_REPEAT_PASSWORD_FIELD,
    CHANGE_REGISTER_FORM_USERNAME_FIELD, EMAIL_AVAILABILITY_SUCCESS, REGISTER_IS_LOADING, USERNAME_AVAILABILITY_SUCCESS,
    VALIDATE_REGISTER_FORM_EMAIL_FIELD,
    VALIDATE_REGISTER_FORM_FIRST_NAME_FIELD,
    VALIDATE_REGISTER_FORM_LAST_NAME_FIELD,
    VALIDATE_REGISTER_FORM_PASSWORD_FIELD, VALIDATE_REGISTER_FORM_REPEAT_PASSWORD_FIELD,
    VALIDATE_REGISTER_FORM_USERNAME_FIELD
} from "../../../action/header/login/RegisterFormAction";
import {handleRegisterIsLoadingReducer, registerFormReducer} from "./RegisterFormReducer";
import moment from "moment";

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
    },
    registerForm: {
        firstNameField: {
            value: '',
            valid: true,
            validationRequired: false,
            errorMessage: '',
            name: 'firstName'
        },
        lastNameField: {
            value: '',
            valid: true,
            validationRequired: false,
            errorMessage: '',
            name: 'lastName'
        },
        genderField: {
            value: 'FEMALE',
            valid: true,
            validationRequired: false,
            errorMessage: '',
            name: 'gender'
        },
        dayOfBirthField: {
            value: moment().subtract(18, 'years').format('YYYY-MM-DD'),
            valid: true,
            validationRequired: false,
            errorMessage: '',
            name: 'dayOfBirth'
        },
        emailField: {
            value: '',
            valid: true,
            validationRequired: false,
            errorMessage: '',
            name: 'email'
        },
        usernameField: {
            value: '',
            valid: true,
            validationRequired: false,
            errorMessage: '',
            name: 'username'
        },
        passwordField: {
            value: '',
            valid: true,
            validationRequired: false,
            errorMessage: '',
            name: 'password'
        },
        repeatPasswordField: {
            value: '',
            valid: true,
            validationRequired: false,
            errorMessage: '',
            name: 'repeatPassword'
        },
        onRegisterLoading: false,
        passwordStrength: {
            atLeastEightCharacters: false,
            atLeastOneNumber: false,
            atLeastOneCapitalLetter: false,
            atLeastOneSpecialCharacter: false
        },
        emailAvailability: null,
        usernameAvailability: null
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
        case CHANGE_REGISTER_FORM_FIRST_NAME_FIELD:
        case VALIDATE_REGISTER_FORM_FIRST_NAME_FIELD:
        case CHANGE_REGISTER_FORM_LAST_NAME_FIELD:
        case VALIDATE_REGISTER_FORM_LAST_NAME_FIELD:
        case CHANGE_REGISTER_FORM_GENDER_FIELD:
        case CHANGE_REGISTER_FORM_DAY_OF_BIRTH_FIELD:
        case CHANGE_REGISTER_FORM_EMAIL_FIELD:
        case VALIDATE_REGISTER_FORM_EMAIL_FIELD:
        case CHANGE_REGISTER_FORM_USERNAME_FIELD:
        case VALIDATE_REGISTER_FORM_USERNAME_FIELD:
        case CHANGE_REGISTER_FORM_PASSWORD_FIELD:
        case VALIDATE_REGISTER_FORM_PASSWORD_FIELD:
        case CHANGE_REGISTER_FORM_REPEAT_PASSWORD_FIELD:
        case VALIDATE_REGISTER_FORM_REPEAT_PASSWORD_FIELD:
        case EMAIL_AVAILABILITY_SUCCESS:
        case USERNAME_AVAILABILITY_SUCCESS:
            return {
                ...state,
                registerForm: registerFormReducer(state.registerForm, action)
            };
        case REGISTER_IS_LOADING:
            return {
                ...state,
                registerForm: handleRegisterIsLoadingReducer(state.registerForm, action)
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

