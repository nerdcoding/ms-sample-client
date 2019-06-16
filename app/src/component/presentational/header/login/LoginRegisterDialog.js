/*
 * LoginRegisterDialog.js
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

import React from "react";
import * as PropTypes from "prop-types";

import {Dialog, DialogTitle, makeStyles, Tab, Tabs} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const useStyles = makeStyles(theme => ({
    tabLabel: {
        display: 'inline'
    }
}));

/**
 * Defines a dialog (opened by the NavigationBar) for login and registration.
 */
function LoginRegisterDialog({isOpen, selectedTab,
        handleDialogToggle, handleTabSwitch,
        loginForm, handleLogin,
        handleLoginFormEmailChange, handleLoginFormEmailValidation,
        handleLoginFormPasswordChange, handleLoginFormPasswordValidation,
        registerForm, handleRegister,
        handleRegisterFormFirstNameChange, handleRegisterFormFirstNameValidation,
        handleRegisterFormLastNameChange, handleRegisterFormLastNameValidation,
        handleRegisterFormGenderChange, handleRegisterFormDayOfBirthChange,
        handleRegisterFormEmailChange, handleRegisterFormEmailValidation,
        handleRegisterFormUsernameChange, handleRegisterFormUsernameValidation,
        handleRegisterFormPasswordChange, handleRegisterFormPasswordValidation,
        handleRegisterFormRepeatPasswordChange, handleRegisterFormRepeatPasswordValidation
        }) {
    const classes = useStyles();
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={() => handleDialogToggle(isOpen)}
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth='sm'
            >
                <DialogTitle id="form-dialog-title">
                    <Tabs value={selectedTab}
                          textColor='primary'
                          indicatorColor='primary'
                          onChange={(event, value) => handleTabSwitch(value)}
                          variant="fullWidth">
                        <Tab label="Login"
                             icon={<PersonIcon />}
                             classes={{ wrapper: classes.tabLabel }}
                        />
                        <Tab label="Register"
                             icon={<PersonAddIcon />}
                             classes={{ wrapper: classes.tabLabel }}
                        />
                    </Tabs>
                </DialogTitle>
                {selectedTab === 0
                    ? <LoginForm
                        loginForm={loginForm}
                        onClose={() => handleDialogToggle(isOpen)}
                        onLogin={handleLogin}
                        handleLoginFormEmailChange={handleLoginFormEmailChange}
                        handleLoginFormEmailValidation={handleLoginFormEmailValidation}
                        handleLoginFormPasswordChange={handleLoginFormPasswordChange}
                        handleLoginFormPasswordValidation={handleLoginFormPasswordValidation}
                      />
                    : <RegisterForm
                        registerForm={registerForm}
                        onClose={() => handleDialogToggle(isOpen)}
                        onRegister={handleRegister}
                        handleRegisterFormFirstNameChange={handleRegisterFormFirstNameChange}
                        handleRegisterFormFirstNameValidation={handleRegisterFormFirstNameValidation}
                        handleRegisterFormLastNameChange={handleRegisterFormLastNameChange}
                        handleRegisterFormLastNameValidation={handleRegisterFormLastNameValidation}
                        handleRegisterFormGenderChange={handleRegisterFormGenderChange}
                        handleRegisterFormDayOfBirthChange={handleRegisterFormDayOfBirthChange}
                        handleRegisterFormEmailChange={handleRegisterFormEmailChange}
                        handleRegisterFormEmailValidation={handleRegisterFormEmailValidation}
                        handleRegisterFormUsernameChange={handleRegisterFormUsernameChange}
                        handleRegisterFormUsernameValidation={handleRegisterFormUsernameValidation}
                        handleRegisterFormPasswordChange={handleRegisterFormPasswordChange}
                        handleRegisterFormPasswordValidation={handleRegisterFormPasswordValidation}
                        handleRegisterFormRepeatPasswordChange={handleRegisterFormRepeatPasswordChange}
                        handleRegisterFormRepeatPasswordValidation={handleRegisterFormRepeatPasswordValidation}
                      />
                }
            </Dialog>
        </div>
    );
}

LoginRegisterDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    selectedTab: PropTypes.number.isRequired,

    loginForm: PropTypes.object.isRequired,
    handleDialogToggle: PropTypes.func.isRequired,
    handleTabSwitch: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    handleLoginFormEmailChange: PropTypes.func.isRequired,
    handleLoginFormEmailValidation: PropTypes.func.isRequired,
    handleLoginFormPasswordChange: PropTypes.func.isRequired,
    handleLoginFormPasswordValidation: PropTypes.func.isRequired,

    registerForm: PropTypes.object.isRequired,
    handleRegister: PropTypes.func.isRequired,
    handleRegisterFormFirstNameChange: PropTypes.func.isRequired,
    handleRegisterFormFirstNameValidation: PropTypes.func.isRequired,
    handleRegisterFormLastNameChange: PropTypes.func.isRequired,
    handleRegisterFormLastNameValidation: PropTypes.func.isRequired,
    handleRegisterFormGenderChange: PropTypes.func.isRequired,
    handleRegisterFormDayOfBirthChange: PropTypes.func.isRequired,
    handleRegisterFormEmailChange: PropTypes.func.isRequired,
    handleRegisterFormEmailValidation: PropTypes.func.isRequired,
    handleRegisterFormUsernameChange: PropTypes.func.isRequired,
    handleRegisterFormUsernameValidation: PropTypes.func.isRequired,
    handleRegisterFormPasswordChange: PropTypes.func.isRequired,
    handleRegisterFormPasswordValidation: PropTypes.func.isRequired,
    handleRegisterFormRepeatPasswordChange: PropTypes.func.isRequired,
    handleRegisterFormRepeatPasswordValidation: PropTypes.func.isRequired,
};

export default LoginRegisterDialog;
