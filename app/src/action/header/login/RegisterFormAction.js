/*
 * RegisterFormAction.js
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
import {requestRestEndpoint} from "../../RestRequestAction";
import {AuthenticationType} from "../../../middleware/auth/AuthenticationType";
import {HttpMethod} from "../../../middleware/HttpMethod";
import {toggleLoginRegisterDialog} from "./LoginRegisterAction";
import PasswordStrengthValidationService from "../../../service/validation/PasswordStrengthValidationService";


const FIRST_NAME_FIELD_NAME = 'firstName';
const LAST_NAME_FIELD_NAME = 'lastName';
const GENDER_FIELD_NAME = 'gender';
const DAY_OF_BIRTH_FIELD_NAME = 'dayOfBirth';
const EMAIL_FIELD_NAME = 'email';
const USERNAME_FIELD_NAME = 'username';
const PASSWORD_FIELD_NAME = 'password';
const REPEAT_PASSWORD_FIELD_NAME = 'repeatPassword';

export const CHANGE_REGISTER_FORM_FIRST_NAME_FIELD = 'CHANGE_REGISTER_FORM_FIRST_NAME_FIELD';
export const VALIDATE_REGISTER_FORM_FIRST_NAME_FIELD = 'VALIDATE_REGISTER_FORM_FIRST_NAME_FIELD';
export const CHANGE_REGISTER_FORM_LAST_NAME_FIELD = 'CHANGE_REGISTER_FORM_LAST_NAME_FIELD';
export const VALIDATE_REGISTER_FORM_LAST_NAME_FIELD = 'VALIDATE_REGISTER_FORM_LAST_NAME_FIELD';
export const CHANGE_REGISTER_FORM_GENDER_FIELD = 'CHANGE_REGISTER_FORM_GENDER_FIELD';
export const CHANGE_REGISTER_FORM_DAY_OF_BIRTH_FIELD = 'CHANGE_REGISTER_FORM_DAY_OF_BIRTH_FIELD';
export const CHANGE_REGISTER_FORM_EMAIL_FIELD = 'CHANGE_REGISTER_FORM_EMAIL_FIELD';
export const VALIDATE_REGISTER_FORM_EMAIL_FIELD = 'VALIDATE_REGISTER_FORM_EMAIL_FIELD';
export const CHANGE_REGISTER_FORM_USERNAME_FIELD = 'CHANGE_REGISTER_FORM_USERNAME_FIELD';
export const VALIDATE_REGISTER_FORM_USERNAME_FIELD = 'VALIDATE_REGISTER_FORM_USERNAME_FIELD';
export const CHANGE_REGISTER_FORM_PASSWORD_FIELD = 'CHANGE_REGISTER_FORM_PASSWORD_FIELD';
export const VALIDATE_REGISTER_FORM_PASSWORD_FIELD = 'VALIDATE_REGISTER_FORM_PASSWORD_FIELD';
export const CHANGE_REGISTER_FORM_REPEAT_PASSWORD_FIELD = 'CHANGE_REGISTER_FORM_REPEAT_PASSWORD_FIELD';
export const VALIDATE_REGISTER_FORM_REPEAT_PASSWORD_FIELD = 'VALIDATE_REGISTER_FORM_REPEAT_PASSWORD_FIELD';
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_IS_LOADING = 'REGISTER_IS_LOADING';

export const EMAIL_AVAILABILITY = 'EMAIL_AVAILABILITY';
export const EMAIL_AVAILABILITY_SUCCESS = 'EMAIL_AVAILABILITY_SUCCESS';
export const USERNAME_AVAILABILITY = 'USERNAME_AVAILABILITY';
export const USERNAME_AVAILABILITY_SUCCESS = 'USERNAME_AVAILABILITY_SUCCESS';

export const changeRegisterFormFirstNameField = (firstNameField, newValue) => {
    let validationResult = {
        valid: firstNameField.valid,
        errorMessage: firstNameField.errorMessage
    };
    if (!validationResult.valid) {
        // during onChange do validation only when already invalid.
        validationResult = InputFieldValidationService.validateRequired(newValue);
    }

    return {
        type: CHANGE_REGISTER_FORM_FIRST_NAME_FIELD,
        firstNameField: {
            value: newValue,
            valid: validationResult.valid,
            errorMessage: validationResult.errorMessage,
            name: FIRST_NAME_FIELD_NAME
        }
    }
};

export const validateRegisterFormFirstNameField = (firstNameField) => {
    const validationResult = InputFieldValidationService.validateRequired(firstNameField.value);

    return {
        type: VALIDATE_REGISTER_FORM_FIRST_NAME_FIELD,
        firstNameField: {
            value: firstNameField.value,
            valid: validationResult.valid,
            validationRequired: firstNameField.validationRequired,
            errorMessage: validationResult.errorMessage,
            name: FIRST_NAME_FIELD_NAME
        }
    }
};

export const changeRegisterFormLastNameField = (lastNameField, newValue) => {
    let validationResult = {
        valid: lastNameField.valid,
        errorMessage: lastNameField.errorMessage
    };
    if (!validationResult.valid) {
        // during onChange do validation only when already invalid.
        validationResult = InputFieldValidationService.validateRequired(newValue);
    }

    return {
        type: CHANGE_REGISTER_FORM_LAST_NAME_FIELD,
        lastNameField: {
            value: newValue,
            valid: validationResult.valid,
            errorMessage: validationResult.errorMessage,
            name: LAST_NAME_FIELD_NAME
        }
    }
};

export const validateRegisterFormLastNameField = (lastNameField) => {
    const validationResult = InputFieldValidationService.validateRequired(lastNameField.value);

    return {
        type: VALIDATE_REGISTER_FORM_LAST_NAME_FIELD,
        lastNameField: {
            value: lastNameField.value,
            valid: validationResult.valid,
            validationRequired: lastNameField.validationRequired,
            errorMessage: validationResult.errorMessage,
            name: LAST_NAME_FIELD_NAME
        }
    }
};

export const changeRegisterFormGenderField = (genderField, newValue) => {
    return {
        type: CHANGE_REGISTER_FORM_GENDER_FIELD,
        genderField: {
            value: newValue,
            valid: true, // no validation - always valid
            errorMessage: '',
            name: GENDER_FIELD_NAME
        }
    }
};

export const changeRegisterFormDayOfBirthField = (dayOfBirthField, event) => {
    return {
        type: CHANGE_REGISTER_FORM_DAY_OF_BIRTH_FIELD,
        dayOfBirthField: {
            value: event === null ? null : event.format('YYYY-MM-DD'),
            valid: true, // no validation - always valid
            errorMessage: '',
            name: DAY_OF_BIRTH_FIELD_NAME
        }
    }
};

export const changeRegisterFormEmailField = (emailField, newValue) => {
    let validationResult = {
        valid: emailField.valid,
        errorMessage: emailField.errorMessage
    };
    if (!validationResult.valid) {
        // during onChange do validation only when already invalid.
        validationResult = InputFieldValidationService.validateEmail(newValue);
    }

    return {
        type: CHANGE_REGISTER_FORM_EMAIL_FIELD,
        emailField: {
            value: newValue,
            valid: validationResult.valid,
            errorMessage: validationResult.errorMessage,
            name: EMAIL_FIELD_NAME
        }
    }
};

export const validateRegisterFormEmailField = (emailField) => {
    const validationResult = InputFieldValidationService.validateEmail(emailField.value);

    return {
        type: VALIDATE_REGISTER_FORM_EMAIL_FIELD,
        emailField: {
            value: emailField.value,
            valid: validationResult.valid,
            validationRequired: emailField.validationRequired,
            errorMessage: validationResult.errorMessage,
            name: EMAIL_FIELD_NAME
        }
    }
};

export const changeRegisterFormUsernameField = (usernameField, newValue) => {
    let validationResult = {
        valid: usernameField.valid,
        errorMessage: usernameField.errorMessage
    };
    if (!validationResult.valid) {
        // during onChange do validation only when already invalid.
        validationResult = InputFieldValidationService.validateInputLength('username', newValue, 6);
    }

    return {
        type: CHANGE_REGISTER_FORM_USERNAME_FIELD,
        usernameField: {
            value: newValue,
            valid: validationResult.valid,
            errorMessage: validationResult.errorMessage,
            name: USERNAME_FIELD_NAME
        }
    }
};
export const validateRegisterFormUsernameField = (usernameField) => {
    const validationResult = InputFieldValidationService.validateInputLength('username', usernameField.value, 6);

    return {
        type: VALIDATE_REGISTER_FORM_USERNAME_FIELD,
        usernameField: {
            value: usernameField.value,
            valid: validationResult.valid,
            errorMessage: validationResult.errorMessage,
            name: USERNAME_FIELD_NAME
        }
    }
};

export const changeRegisterFormPasswordField = (passwordField, newValue, repeatPasswordField) => {
    const validationResult = PasswordStrengthValidationService.validate(newValue);
    if (repeatPasswordField.value && repeatPasswordField.value.length > 0) {
        // if 'repeatPasswordField' already contains a value: set field to invalid
        repeatPasswordField.valid = false;
    }

    return {
        type: CHANGE_REGISTER_FORM_PASSWORD_FIELD,
        passwordField: {
            value: newValue,
            valid: validationResult.valid,
            errorMessage: validationResult.errorMessage,
            name: PASSWORD_FIELD_NAME
        },
        passwordStrength: validationResult.passwordStrength,
        repeatPasswordField
    }
};

export const validateRegisterFormPasswordField = (passwordField, repeatPasswordField) => {
    const validationResult = PasswordStrengthValidationService.validate(passwordField.value);
    if (repeatPasswordField.value && repeatPasswordField.value.length > 0) {
        // if 'repeatPasswordField' already contains a value: set field to invalid
        repeatPasswordField.valid = false;
    }

    return {
        type: VALIDATE_REGISTER_FORM_PASSWORD_FIELD,
        passwordField: {
            value: passwordField.value,
            valid: validationResult.valid,
            errorMessage: validationResult.errorMessage,
            name: PASSWORD_FIELD_NAME
        },
        passwordStrength: validationResult.passwordStrength,
        repeatPasswordField
    }
};

export const changeRegisterFormRepeatPasswordField = (repeatPasswordField, passwordField, newValue) => {
    let validationResult = {
        valid: repeatPasswordField.valid,
        errorMessage: repeatPasswordField.errorMessage
    };
    if (!validationResult.valid) {
        // during onChange do validation only when already invalid.
        validationResult = InputFieldValidationService.matchPasswords(newValue, passwordField.value);
    }

    return {
        type: CHANGE_REGISTER_FORM_REPEAT_PASSWORD_FIELD,
        repeatPasswordField: {
            value: newValue,
            valid: validationResult.valid,
            errorMessage: validationResult.errorMessage,
            name: REPEAT_PASSWORD_FIELD_NAME
        }
    }
};

export const validateRegisterFormRepeatPasswordField = (repeatPasswordField, passwordField) => {
    const validationResult = InputFieldValidationService.matchPasswords(repeatPasswordField.value, passwordField.value);

    return {
        type: VALIDATE_REGISTER_FORM_REPEAT_PASSWORD_FIELD,
        repeatPasswordField: {
            value: repeatPasswordField.value,
            valid: validationResult.valid,
            validationRequired: repeatPasswordField.validationRequired,
            errorMessage: validationResult.errorMessage,
            name: REPEAT_PASSWORD_FIELD_NAME
        }
    }
};

export const handleRegister = (registerForm) => {
    return requestRestEndpoint({
        type: REGISTER,
        authenticationType: AuthenticationType.BASIC_AUTH,
        method: HttpMethod.POST,
        endpoint: process.env.AUTH_SERVER_URL + '/user',
        payload: JSON.stringify({
            firstName: registerForm.firstNameField.value,
            lastName: registerForm.lastNameField.value,
            email: registerForm.emailField.value,
            username: registerForm.usernameField.value,
            gender: registerForm.genderField.value,
            dayOfBirth: registerForm.dayOfBirthField.value,
            password: registerForm.passwordField.value
        }),
        headers: {
            'Authorization': 'Basic ' + btoa(process.env.AUTH_SERVER_USER+':'+process.env.AUTH_SERVER_PASSWORD),
            'Content-Type': 'application/json'
        },
        success: {
            showSuccessMessage: true,
            successMessageText: 'Registration was successfully completed',
        },
        subsequentActions: {
            successActions: [toggleLoginRegisterDialog(true)],
            errorActions: []
        }
    });
};

export const checkEmailAvailability = (email) => {
        return requestRestEndpoint({
            type: EMAIL_AVAILABILITY,
            authenticationType: AuthenticationType.BASIC_AUTH,
            method: HttpMethod.GET,
            endpoint: process.env.AUTH_SERVER_URL + '/user/email/' + email,
            headers: {
                'Authorization': 'Basic ' + btoa(process.env.AUTH_SERVER_USER+':'+process.env.AUTH_SERVER_PASSWORD),
                'Content-Type': 'application/json'
            },
            error: {
                showErrorMessage: false,
            },
            subsequentActions: {
                successActions: [],
                errorActions: [{
                    type: EMAIL_AVAILABILITY_SUCCESS,
                    response: false
                }]
            }
        });
};

export const checkUsernameAvailability = (username) => {
        return requestRestEndpoint({
            type: USERNAME_AVAILABILITY,
            authenticationType: AuthenticationType.BASIC_AUTH,
            method: HttpMethod.GET,
            endpoint: process.env.AUTH_SERVER_URL + '/user/' + username,
            headers: {
                'Authorization': 'Basic ' + btoa(process.env.AUTH_SERVER_USER + ':' + process.env.AUTH_SERVER_PASSWORD),
                'Content-Type': 'application/json'
            },
            error: {
                showErrorMessage: false,
            },
            subsequentActions: {
                successActions: [],
                errorActions: [{
                    type: USERNAME_AVAILABILITY_SUCCESS,
                    response: false
                }]
            }
        });
};