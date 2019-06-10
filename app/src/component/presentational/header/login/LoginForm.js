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


const LoginForm = ({loginForm, onClose, onLogin, handleLoginFormEmailChange, handleLoginFormEmailValidation}) => {
    return(
        <React.Fragment>
            <form onSubmit={onLogin} noValidate>
                <DialogContent>
                    <TextField
                        id='email'
                        name={loginForm.emailField.name}
                        type='email'
                        label='Email Address'
                        value={loginForm.emailField.value}
                        error={!loginForm.emailField.valid}
                        helperText={loginForm.emailField.valid ? '' : loginForm.emailField.errorMessage}
                        onChange={e => handleLoginFormEmailChange(loginForm.emailField, e.target.value)}
                        onBlur={() => handleLoginFormEmailValidation(loginForm.emailField)}
                        margin="dense"
                        fullWidth
                        autoFocus
                    />
                    {/*<TextField
                        id='password'
                        name={PASSWORD_FIELD_NAME}
                        type='password'
                        label='Password'
                        value={passwordField.value}
                        error={!passwordField.valid}
                        helperText={passwordField.valid ? '' : passwordField.errorMessage}
                        onChange={this.handleInputChange}
                        onBlur={this.validate}
                        margin="dense"
                        fullWidth
                    />*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary" >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        variant='outlined'
                        type='submit'
                    >
                        Login
                    </Button>

                </DialogActions>
            </form>


        </React.Fragment>
    );
};

export default LoginForm;