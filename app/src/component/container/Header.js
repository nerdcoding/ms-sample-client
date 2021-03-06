/*
 * Header.js
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

import {connect} from "react-redux";

import NavigationBar from "../presentational/header/NavigationBar";
import {toggleMobileMenu, toggleProfileMenu} from "../../action/header/HeaderAction";
import {switchLoginRegisterDialogTab, toggleLoginRegisterDialog} from "../../action/header/login/LoginRegisterAction";
import {
    changeLoginFormEmailField,
    changeLoginFormPasswordField,
    handleLogin,
    validateLoginFormEmailField,
    validateLoginFormPasswordField
} from "../../action/header/login/LoginFormAction";
import React from "react";
import {
    changeRegisterFormDayOfBirthField,
    changeRegisterFormEmailField,
    changeRegisterFormFirstNameField,
    changeRegisterFormGenderField,
    changeRegisterFormLastNameField,
    changeRegisterFormPasswordField,
    changeRegisterFormRepeatPasswordField,
    changeRegisterFormUsernameField,
    checkEmailAvailability,
    checkUsernameAvailability,
    handleRegister,
    validateRegisterFormEmailField,
    validateRegisterFormFirstNameField,
    validateRegisterFormLastNameField,
    validateRegisterFormPasswordField,
    validateRegisterFormRepeatPasswordField,
    validateRegisterFormUsernameField
} from "../../action/header/login/RegisterFormAction";

const mapStateToProps = state => ({
    header: state.header,
    authentication: state.authentication
});

const mapDispatchToProps = dispatch => ({
    openMobileMenu: anchorEL => dispatch(toggleMobileMenu(anchorEL)),
    closeMobileMenu: () => dispatch(toggleMobileMenu(null)),
    openProfileMenu: anchorEL => dispatch(toggleProfileMenu(anchorEL)),
    closeProfileMenu: () => dispatch(toggleProfileMenu(null)),
    toggleLoginRegisterDialog: isOpen => dispatch(toggleLoginRegisterDialog(isOpen)),
    switchLoginRegisterDialogTab: selectedTab => dispatch(switchLoginRegisterDialogTab(selectedTab)),

    handleLogin: (username, password) => dispatch(handleLogin(username, password)),
    handleLoginFormEmailChange: (emailField, newValue) => dispatch(changeLoginFormEmailField(emailField, newValue)),
    handleLoginFormEmailValidation: emailField => dispatch(validateLoginFormEmailField(emailField)),
    handleLoginFormPasswordChange: (passwordField, newValue) => dispatch(changeLoginFormPasswordField(passwordField, newValue)),
    handleLoginFormPasswordValidation: passwordField => dispatch(validateLoginFormPasswordField(passwordField)),

    handleRegister: (registerForm) => dispatch(handleRegister(registerForm)),
    handleRegisterFormFirstNameChange: (firstNameField, newValue) => dispatch(changeRegisterFormFirstNameField(firstNameField, newValue)),
    handleRegisterFormFirstNameValidation: (firstNameField) => dispatch(validateRegisterFormFirstNameField(firstNameField)),
    handleRegisterFormLastNameChange: (lastNameField, newValue) => dispatch(changeRegisterFormLastNameField(lastNameField, newValue)),
    handleRegisterFormLastNameValidation: (lastNameField) => dispatch(validateRegisterFormLastNameField(lastNameField)),
    handleRegisterFormGenderChange: (genderField, newValue) => dispatch(changeRegisterFormGenderField(genderField, newValue)),
    handleRegisterFormDayOfBirthChange: (dayOfBirthField, event) => dispatch(changeRegisterFormDayOfBirthField(dayOfBirthField, event)),
    handleRegisterFormEmailChange: (emailField, newValue) => dispatch(changeRegisterFormEmailField(emailField, newValue)),
    handleRegisterFormEmailValidation: (emailField) => dispatch(validateRegisterFormEmailField(emailField)),
    handleRegisterFormUsernameChange: (usernameField, newValue) => dispatch(changeRegisterFormUsernameField(usernameField, newValue)),
    handleRegisterFormUsernameValidation: (usernameField) => dispatch(validateRegisterFormUsernameField(usernameField)),
    handleRegisterFormPasswordChange: (passwordField, newValue, repeatPasswordField) => dispatch(changeRegisterFormPasswordField(passwordField, newValue, repeatPasswordField)),
    handleRegisterFormPasswordValidation: (passwordField, repeatPasswordField) => dispatch(validateRegisterFormPasswordField(passwordField, repeatPasswordField)),
    handleRegisterFormRepeatPasswordChange: (repeatPasswordField, passwordField, newValue) => dispatch(changeRegisterFormRepeatPasswordField(repeatPasswordField, passwordField, newValue)),
    handleRegisterFormRepeatPasswordValidation: (repeatPasswordField, passwordField) => dispatch(validateRegisterFormRepeatPasswordField(repeatPasswordField, passwordField)),
    checkEmailAvailability: (email) => dispatch(checkEmailAvailability(email)),
    checkUsernameAvailability: (username) => dispatch(checkUsernameAvailability(username))

});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBar)