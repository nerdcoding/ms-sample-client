/*
 * LoginForm.js
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

import * as React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import LoadingButton from "../../util/LoadingButton";
import * as PropTypes from "prop-types";

const LoginForm = ({loginForm, onClose, onLogin,
        handleLoginFormEmailChange, handleLoginFormEmailValidation,
        handleLoginFormPasswordChange, handleLoginFormPasswordValidation}) => {
    return(
        <React.Fragment>
            <form onSubmit={e => {
                    e.preventDefault();
                    onLogin(loginForm.emailField.value, loginForm.passwordField.value);
                  }}
                  noValidate>
                <DialogContent>
                    <TextField
                        id='email'
                        name={loginForm.emailField.name}
                        type='email'
                        label='Email Address'
                        value={loginForm.emailField.value}
                        error={!loginForm.emailField.valid}
                        helperText={loginForm.emailField.valid ? '' : loginForm.emailField.errorMessage}
                        onChange={e => {
                            e.preventDefault();
                            handleLoginFormEmailChange(loginForm.emailField, e.target.value);
                        }}
                        onBlur={e => {
                            e.preventDefault();
                            handleLoginFormEmailValidation(loginForm.emailField);
                        }}
                        margin="dense"
                        fullWidth
                        autoFocus
                    />
                    <TextField
                        id='password'
                        name={loginForm.passwordField.name}
                        type='password'
                        label='Password'
                        value={loginForm.passwordField.value}
                        error={!loginForm.passwordField.valid}
                        helperText={loginForm.passwordField.valid ? '' : loginForm.passwordField.errorMessage}
                        onChange={e => {
                            e.preventDefault();
                            handleLoginFormPasswordChange(loginForm.passwordField, e.target.value);
                        }}
                        onBlur={e => {
                            e.preventDefault();
                            handleLoginFormPasswordValidation(loginForm.passwordField);
                        }}
                        margin="dense"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary" >
                        Cancel
                    </Button>
                    <LoadingButton
                        isLoading={loginForm.onLoginLoading}
                        disabled={!areAllFieldsValid(loginForm)}
                        color="primary"
                        variant='outlined'
                        type='submit'
                    >
                        Login
                    </LoadingButton>

                </DialogActions>
            </form>


        </React.Fragment>
    );
};

LoginForm.propTypes = {
    loginForm: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    handleLoginFormEmailChange: PropTypes.func.isRequired,
    handleLoginFormEmailValidation: PropTypes.func.isRequired,
    handleLoginFormPasswordChange: PropTypes.func.isRequired,
    handleLoginFormPasswordValidation: PropTypes.func.isRequired,
};

export default LoginForm;

const areAllFieldsValid = (loginForm) => {
    return !loginForm.onLoginLoading
        && loginForm.emailField.valid
        && loginForm.passwordField.valid;
};