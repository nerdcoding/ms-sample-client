/*
 * PassowrdStrengthValidator.js
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


import {MINIMUM_PASSWORD_LENGTH} from "../Constants";

const PasswordStrengthValidationService = {

    validate: function(value) {
        const atLeastEightCharacters = hasAtLeastEightCharacters(value);
        const atLeastOneNumber = hasAtLeastOneNumber(value);
        const atLeastOneCapitalLetter = hasAtLeastOneCapitalLetter(value);
        const atLeastOneSpecialCharacter = hasAtLeastOneSpecialCharacter(value);

        let errorMessage;
        if (!atLeastEightCharacters) {
            errorMessage = 'At least ' + MINIMUM_PASSWORD_LENGTH + ' character.';
        } else if (!atLeastOneNumber) {
            errorMessage = 'At least one number.';
        } else if (!atLeastOneCapitalLetter) {
            errorMessage = 'At least one capital letter.';
        } else if (!atLeastOneSpecialCharacter) {
            errorMessage = 'At least one special character.';
        } else {
            errorMessage = '';
        }

      return {
          valid: atLeastEightCharacters && atLeastOneNumber && atLeastOneCapitalLetter && atLeastOneSpecialCharacter,
          errorMessage,
          passwordStrength: {
              atLeastEightCharacters,
              atLeastOneNumber,
              atLeastOneCapitalLetter,
              atLeastOneSpecialCharacter
          }
      }
    }

};

export default PasswordStrengthValidationService;

const hasAtLeastEightCharacters = (value) => {
    return value && value.length >= MINIMUM_PASSWORD_LENGTH;
};

const hasAtLeastOneNumber = (value) => {
    return value && /\d/.test(value);
};

const hasAtLeastOneCapitalLetter = (value) => {
    return value && /[A-Z]/.test(value);
};

const hasAtLeastOneSpecialCharacter = (value) => {
    return value && /[!@#$%^&*()\-_=+\|\\\[\]{};:'"/?.,<>~`]/.test(value);
};