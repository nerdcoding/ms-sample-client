/*
 * RegisterFormReducer.js
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
    CHANGE_REGISTER_FORM_DAY_OF_BIRTH_FIELD,
    CHANGE_REGISTER_FORM_EMAIL_FIELD,
    CHANGE_REGISTER_FORM_FIRST_NAME_FIELD,
    CHANGE_REGISTER_FORM_GENDER_FIELD,
    CHANGE_REGISTER_FORM_LAST_NAME_FIELD,
    CHANGE_REGISTER_FORM_PASSWORD_FIELD,
    CHANGE_REGISTER_FORM_REPEAT_PASSWORD_FIELD,
    CHANGE_REGISTER_FORM_USERNAME_FIELD,
    REGISTER_IS_LOADING,
    VALIDATE_REGISTER_FORM_EMAIL_FIELD,
    VALIDATE_REGISTER_FORM_FIRST_NAME_FIELD,
    VALIDATE_REGISTER_FORM_LAST_NAME_FIELD,
    VALIDATE_REGISTER_FORM_PASSWORD_FIELD, VALIDATE_REGISTER_FORM_REPEAT_PASSWORD_FIELD,
    VALIDATE_REGISTER_FORM_USERNAME_FIELD
} from "../../../action/header/login/RegisterFormAction";

export const registerFormReducer = (registerForm, action) => {
    switch (action.type) {
        case CHANGE_REGISTER_FORM_FIRST_NAME_FIELD:
        case VALIDATE_REGISTER_FORM_FIRST_NAME_FIELD:
            return {
                ...registerForm,
                firstNameField: {
                    value: action.firstNameField.value,
                    valid: action.firstNameField.valid,
                    validationRequired: action.firstNameField.validationRequired,
                    errorMessage: action.firstNameField.errorMessage,
                    name: action.firstNameField.name
                }
            };
        case CHANGE_REGISTER_FORM_LAST_NAME_FIELD:
        case VALIDATE_REGISTER_FORM_LAST_NAME_FIELD:
            return {
                ...registerForm,
                lastNameField: {
                    value: action.lastNameField.value,
                    valid: action.lastNameField.valid,
                    validationRequired: action.lastNameField.validationRequired,
                    errorMessage: action.lastNameField.errorMessage,
                    name: action.lastNameField.name
                }
            };
        case CHANGE_REGISTER_FORM_GENDER_FIELD:
            return {
                ...registerForm,
                genderField: {
                    value: action.genderField.value,
                    valid: action.genderField.valid,
                    validationRequired: action.genderField.validationRequired,
                    errorMessage: action.genderField.errorMessage,
                    name: action.genderField.name
                }
            };
        case CHANGE_REGISTER_FORM_DAY_OF_BIRTH_FIELD:
            return {
                ...registerForm,
                dayOfBirthField: {
                    value: action.dayOfBirthField.value,
                    valid: action.dayOfBirthField.valid,
                    validationRequired: action.dayOfBirthField.validationRequired,
                    errorMessage: action.dayOfBirthField.errorMessage,
                    name: action.dayOfBirthField.name
                }
            };
        case CHANGE_REGISTER_FORM_EMAIL_FIELD:
        case VALIDATE_REGISTER_FORM_EMAIL_FIELD:
            return {
                ...registerForm,
                emailField: {
                    value: action.emailField.value,
                    valid: action.emailField.valid,
                    validationRequired: action.emailField.validationRequired,
                    errorMessage: action.emailField.errorMessage,
                    name: action.emailField.name
                }
            };

        case CHANGE_REGISTER_FORM_USERNAME_FIELD:
        case VALIDATE_REGISTER_FORM_USERNAME_FIELD:
            return {
                ...registerForm,
                usernameField: {
                    value: action.usernameField.value,
                    valid: action.usernameField.valid,
                    validationRequired: action.usernameField.validationRequired,
                    errorMessage: action.usernameField.errorMessage,
                    name: action.usernameField.name
                }
            };
        case CHANGE_REGISTER_FORM_PASSWORD_FIELD:
        case VALIDATE_REGISTER_FORM_PASSWORD_FIELD:
            return {
                ...registerForm,
                passwordField: {
                    value: action.passwordField.value,
                    valid: action.passwordField.valid,
                    validationRequired: action.passwordField.validationRequired,
                    errorMessage: action.passwordField.errorMessage,
                    name: action.passwordField.name
                }
            };
        case CHANGE_REGISTER_FORM_REPEAT_PASSWORD_FIELD:
        case VALIDATE_REGISTER_FORM_REPEAT_PASSWORD_FIELD:
            return {
                ...registerForm,
                repeatPasswordField: {
                    value: action.repeatPasswordField.value,
                    valid: action.repeatPasswordField.valid,
                    validationRequired: action.repeatPasswordField.validationRequired,
                    errorMessage: action.repeatPasswordField.errorMessage,
                    name: action.repeatPasswordField.name
                }
            };
        default:
            return registerForm;
    }
};

export const handleRegisterIsLoadingReducer = (registerForm, action) => {
    if (action.type === REGISTER_IS_LOADING) {
        return {
            ...registerForm,
            onRegisterLoading: action.isLoading
        }
    }

    return registerForm;
};