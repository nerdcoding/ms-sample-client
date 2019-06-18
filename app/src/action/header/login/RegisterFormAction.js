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
const LAST_NAME_FIELD_NAME = 'lasteName';
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

export const changeRegisterFormFirstNameField = (firstNameField, newValue) => {
    return {
        type: CHANGE_REGISTER_FORM_FIRST_NAME_FIELD,
        firstNameField: {
            value: newValue,
            valid: true, // Always valid during changing, validation is done afterwards.
            validationRequired: true, // after first change by the user, validation is always required
            errorMessage: firstNameField.errorMessage,
            name: FIRST_NAME_FIELD_NAME
        }
    }
};

export const validateRegisterFormFirstNameField = (firstNameField) => {
    let validationResult = {
        valid: true,
        errorMessage: ''
    };
    if (firstNameField.validationRequired) {
        validationResult = InputFieldValidationService.validateRequired(firstNameField.value)
    }

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
    return {
        type: CHANGE_REGISTER_FORM_LAST_NAME_FIELD,
        lastNameField: {
            value: newValue,
            valid: true, // Always valid during changing, validation is done afterwards.
            validationRequired: true, // after first change by the user, validation is always required
            errorMessage: lastNameField.errorMessage,
            name: LAST_NAME_FIELD_NAME
        }
    }
};

export const validateRegisterFormLastNameField = (lastNameField) => {
    let validationResult = {
        valid: true,
        errorMessage: ''
    };
    if (lastNameField.validationRequired) {
        validationResult = InputFieldValidationService.validateRequired(lastNameField.value)
    }

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
            valid: true, // Always valid during changing, validation is done afterwards.
            validationRequired: true, // after first change by the user, validation is always required
            errorMessage: genderField.errorMessage,
            name: GENDER_FIELD_NAME
        }
    }
};

export const changeRegisterFormDayOfBirthField = (dayOfBirthField, event) => {
    return {
        type: CHANGE_REGISTER_FORM_DAY_OF_BIRTH_FIELD,
        dayOfBirthField: {
            value: event === null ? null : event.format('YYYY-MM-DD'),
            valid: true, // Always valid during changing, validation is done afterwards.
            validationRequired: true, // after first change by the user, validation is always required
            errorMessage: dayOfBirthField.errorMessage,
            name: DAY_OF_BIRTH_FIELD_NAME
        }
    }
};

export const changeRegisterFormEmailField = (emailField, newValue) => {
    return {
        type: CHANGE_REGISTER_FORM_EMAIL_FIELD,
        emailField: {
            value: newValue,
            valid: true, // Always valid during changing, validation is done afterwards.
            validationRequired: true, // after first change by the user, validation is always required
            errorMessage: emailField.errorMessage,
            name: EMAIL_FIELD_NAME
        }
    }
};

export const validateRegisterFormEmailField = (emailField) => {
    let validationResult = {
        valid: true,
        errorMessage: ''
    };
    if (emailField.validationRequired) {
        validationResult = InputFieldValidationService.validateEmail(emailField.value);
    }

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
    return {
        type: CHANGE_REGISTER_FORM_USERNAME_FIELD,
        usernameField: {
            value: newValue,
            valid: true, // Always valid during changing, validation is done afterwards.
            validationRequired: true, // after first change by the user, validation is always required
            errorMessage: usernameField.errorMessage,
            name: USERNAME_FIELD_NAME
        }
    }
};
export const validateRegisterFormUsernameField = (usernameField) => {
    let validationResult = {
        valid: true,
        errorMessage: ''
    };
    if (usernameField.validationRequired) {
        validationResult = InputFieldValidationService.validateInputLength('username', usernameField.value, 6);
    }

    return {
        type: VALIDATE_REGISTER_FORM_USERNAME_FIELD,
        usernameField: {
            value: usernameField.value,
            valid: validationResult.valid,
            validationRequired: usernameField.validationRequired,
            errorMessage: validationResult.errorMessage,
            name: USERNAME_FIELD_NAME
        }
    }
};

export const changeRegisterFormPasswordField = (passwordField, newValue) => {
    return {
        type: CHANGE_REGISTER_FORM_PASSWORD_FIELD,
        passwordField: {
            value: newValue,
            valid: true, // Always valid during changing, validation is done afterwards.
            validationRequired: true, // after first change by the user, validation is always required
            errorMessage: passwordField.errorMessage,
            name: PASSWORD_FIELD_NAME
        },
        passwordStrength: {
            atLeastEightCharacters: PasswordStrengthValidationService.hasAtLeastEightCharacters(newValue),
            atLeastOneNumber: PasswordStrengthValidationService.hasAtLeastOneNumber(newValue),
            atLeastOneCapitalLetter: PasswordStrengthValidationService.hasAtLeastOneCapitalLetter(newValue),
            atLeastOneSpecialCharacter: PasswordStrengthValidationService.hasAtLeastOneSpecialCharacter(newValue)
        }
    }
};

export const validateRegisterFormPasswordField = (passwordField, passwordStrength) => {
    const { atLeastEightCharacters, atLeastOneNumber,
            atLeastOneCapitalLetter, atLeastOneSpecialCharacter } = passwordStrength;
    let validationResult;
    if (passwordField.validationRequired && !atLeastEightCharacters) {
        validationResult =  {
            valid: false,
            errorMessage: 'At least 8 character.'
        };
    } else if (passwordField.validationRequired && !atLeastOneNumber) {
        validationResult =  {
            valid: false,
            errorMessage: 'At least one number.'
        };
    } else if (passwordField.validationRequired && !atLeastOneCapitalLetter) {
        validationResult =  {
            valid: false,
            errorMessage: 'At least one capital letter.'
        };
    } else if (passwordField.validationRequired && !atLeastOneSpecialCharacter) {
        validationResult =  {
            valid: false,
            errorMessage: 'At least one special character.'
        };
    } else {
        validationResult = {
            valid: true,
            errorMessage: ''
        };
    }

    return {
        type: VALIDATE_REGISTER_FORM_PASSWORD_FIELD,
        passwordField: {
            value: passwordField.value,
            valid: validationResult.valid,
            validationRequired: passwordField.validationRequired,
            errorMessage: validationResult.errorMessage,
            name: PASSWORD_FIELD_NAME
        },
        passwordStrength
    }
};

export const changeRegisterFormRepeatPasswordField = (repeatPasswordField, newValue) => {
    return {
        type: CHANGE_REGISTER_FORM_REPEAT_PASSWORD_FIELD,
        repeatPasswordField: {
            value: newValue,
            valid: true, // Always valid during changing, validation is done afterwards.
            validationRequired: true, // after first change by the user, validation is always required
            errorMessage: repeatPasswordField.errorMessage,
            name: REPEAT_PASSWORD_FIELD_NAME
        }
    }
};

export const validateRegisterFormRepeatPasswordField = (repeatPasswordField, passwordField) => {
    let validationResult;
    if (repeatPasswordField.validationRequired && (repeatPasswordField.value !== passwordField.value)) {
        validationResult =  {
            valid: false,
            errorMessage: 'The passwords do not match.'
        };
    } else {
        validationResult = {
            valid: true,
            errorMessage: ''
        };
    }

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
            dayOfBirth: registerForm.dayOfBirth.value,
            password: registerForm.passwordField.value
        }),
        headers: {
            'Authorization': 'Basic ' + btoa(process.env.AUTH_SERVER_USER+':'+process.env.AUTH_SERVER_PASSWORD),
            'Content-Type': 'application/json'
        },
        success: {
            showSuccessMessage: false,
            successMessageText: 'Registration was successfully completed',
        },
        subsequentActions: {
            successActions: [toggleLoginRegisterDialog(true)],
            errorActions: []
        }
    });
};