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

import InputFieldValidationService from "../service/validation/InputFieldValidationService";

export const CHANGE_EMAIL_FIELD = 'CHANGE_EMAIL_FIELD';
export const VALIDATE_EMAIL_FIELD = 'VALIDATE_EMAIL_FIELD';
export const CHANGE_PASSWORD_FIELD = 'CHANGE_PASSWORD_FIELD';

export const changeEmailField = (emailField, newValue) => {
    return {
        type: CHANGE_EMAIL_FIELD,
        emailField: {
            value: newValue,
            valid: emailField.valid,
            validationRequired: true, // after first change by the user, validation is always required
            errorMessage: emailField.errorMessage,
            name: 'email'
        }
    }
};


export const validateEmailField = (emailField) => {
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
            name: 'email'
        }
    }
};