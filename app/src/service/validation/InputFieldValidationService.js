/*
 * InputFieldValidationService.js
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

const InputFieldValidationService = {

    validateRequired: function(value) {
        if (!value || value.length <= 0) {
            return {
                valid: false,
                errorMessage: 'This field is required.'
            };
        }

        return {
            valid: true,
            errorMessage: ''
        };
    },

    validateEmail: function(emailValue) {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailValue || emailValue.length <= 0) {
            return {
                valid: false,
                errorMessage: 'This field is required.'
            };
        } else if (!emailRegex.test(emailValue)) {
            return {
                valid: false,
                errorMessage: 'Please enter an valid email.'
            };
        }

        return {
            valid: true,
            errorMessage: ''
        };
    },

    validateInputLength: function(fieldName, fieldValue, minLength) {
        if (!fieldValue || fieldValue.length <= 0) {
            return {
                valid: false,
                errorMessage: 'This field is required.'
            };
        } else if (fieldValue.length < minLength) {
            return {
                valid: false,
                errorMessage: 'The ' + fieldName + ' must be at least ' + minLength + ' characters long.'
            };
        }

        return {
            valid: true,
            errorMessage: ''
        };
    }
};

export default InputFieldValidationService;