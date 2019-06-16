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
import {toggleLoginRegisterDialog, switchLoginRegisterDialogTab} from "../../action/header/login/LoginRegisterAction";
import {
    changeLoginFormEmailField,
    changeLoginFormPasswordField,
    handleLogin,
    validateLoginFormEmailField,
    validateLoginFormPasswordField
} from "../../action/header/login/LoginFormAction";
import React from "react";

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
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBar)