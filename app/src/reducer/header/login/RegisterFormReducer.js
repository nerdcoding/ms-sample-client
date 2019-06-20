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
    CHANGE_REGISTER_FORM_USERNAME_FIELD, EMAIL_AVAILABILITY_SUCCESS,
    REGISTER_IS_LOADING, USERNAME_AVAILABILITY_SUCCESS,
    VALIDATE_REGISTER_FORM_EMAIL_FIELD,
    VALIDATE_REGISTER_FORM_FIRST_NAME_FIELD,
    VALIDATE_REGISTER_FORM_LAST_NAME_FIELD,
    VALIDATE_REGISTER_FORM_PASSWORD_FIELD,
    VALIDATE_REGISTER_FORM_REPEAT_PASSWORD_FIELD,
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
                    errorMessage: action.passwordField.errorMessage,
                    name: action.passwordField.name
                },
                passwordStrength: {
                    atLeastEightCharacters: action.passwordStrength.atLeastEightCharacters,
                    atLeastOneNumber: action.passwordStrength.atLeastOneNumber,
                    atLeastOneCapitalLetter: action.passwordStrength.atLeastOneCapitalLetter,
                    atLeastOneSpecialCharacter: action.passwordStrength.atLeastOneSpecialCharacter
                },
                repeatPasswordField: action.repeatPasswordField
            };
        case CHANGE_REGISTER_FORM_REPEAT_PASSWORD_FIELD:
        case VALIDATE_REGISTER_FORM_REPEAT_PASSWORD_FIELD:
            return {
                ...registerForm,
                repeatPasswordField: {
                    value: action.repeatPasswordField.value,
                    valid: action.repeatPasswordField.valid,
                    errorMessage: action.repeatPasswordField.errorMessage,
                    name: action.repeatPasswordField.name
                }
            };
        case EMAIL_AVAILABILITY_SUCCESS:
            return {
                ...registerForm,
                emailAvailability: !action.response
            };
        case USERNAME_AVAILABILITY_SUCCESS:
            return {
                ...registerForm,
                usernameAvailability: !action.response
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