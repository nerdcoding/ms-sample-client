/*
 * LoginFOrm.js
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
import {makeStyles} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import {DatePicker, KeyboardDatePicker} from "@material-ui/pickers";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import LoadingButton from "../../util/LoadingButton";
import moment from "moment";
import * as PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    green: {
        color: theme.palette.success
    },
    red: {
        color: theme.palette.error.main
    },
    noTopPadding: {
        paddingTop: '0 !important'
    }
}));

const RegisterForm = ({registerForm, onClose, onRegister,
        handleRegisterFormFirstNameChange, handleRegisterFormFirstNameValidation,
        handleRegisterFormLastNameChange, handleRegisterFormLastNameValidation,
        handleRegisterFormGenderChange, handleRegisterFormDayOfBirthChange,
        handleRegisterFormEmailChange, handleRegisterFormEmailValidation,
        handleRegisterFormUsernameChange, handleRegisterFormUsernameValidation,
        handleRegisterFormPasswordChange, handleRegisterFormPasswordValidation,
        handleRegisterFormRepeatPasswordChange, handleRegisterFormRepeatPasswordValidation
        }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <form className={classes.root} onSubmit={onRegister} noValidate>
                <DialogContent>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <TextField
                                id='firstName'
                                name={registerForm.firstNameField.name}
                                type='text'
                                label='First name'
                                value={registerForm.firstNameField.value}
                                error={!registerForm.firstNameField.valid}
                                helperText={registerForm.firstNameField.valid ? '' : registerForm.firstNameField.errorMessage}
                                onChange={e => {
                                    e.preventDefault();
                                    handleRegisterFormFirstNameChange(registerForm.firstNameField, e.target.value);
                                }}
                                onBlur={e => {
                                    e.preventDefault();
                                    handleRegisterFormFirstNameValidation(registerForm.firstNameField);
                                }}
                                margin="dense"
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='lastName'
                                name={registerForm.lastNameField.name}
                                type='text'
                                label='Last name'
                                value={registerForm.lastNameField.value}
                                error={!registerForm.lastNameField.valid}
                                helperText={registerForm.lastNameField.valid ? '' : registerForm.lastNameField.errorMessage}
                                onChange={e => {
                                    e.preventDefault();
                                    handleRegisterFormLastNameChange(registerForm.lastNameField, e.target.value);
                                }}
                                onBlur={e => {
                                    e.preventDefault();
                                    handleRegisterFormLastNameValidation(registerForm.lastNameField);
                                }}
                                margin="dense"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography color='textSecondary'>Gender</Typography>
                            <RadioGroup
                                aria-label="Gender"
                                name={registerForm.genderField.name}
                                value={registerForm.genderField.value}
                                onChange={e => {
                                    e.preventDefault();
                                    handleRegisterFormGenderChange(registerForm.genderField, e.target.value);
                                }}
                            >
                                <FormControlLabel value="FEMALE"
                                                  control={
                                                      <Radio color='primary' />
                                                  }
                                                  label="Female" />
                                <FormControlLabel value="MALE"
                                                  control={
                                                      <Radio color='primary' />
                                                  }
                                                  label="Male" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={6}>
                            <KeyboardDatePicker
                                margin="normal"
                                label="Day of birth"
                                name={registerForm.dayOfBirthField.name}
                                value={registerForm.dayOfBirthField.value}
                                onChange={e => handleRegisterFormDayOfBirthChange(registerForm.dayOfBirthField, e)}
                                maxDate={moment().subtract(18, 'years')}
                                allowKeyboardControl={true}
                                format='YYYY-MM-DD'
                                openTo='year'
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                id='email'
                                name={registerForm.emailField.name}
                                type='email'
                                label='Email'
                                value={registerForm.emailField.value}
                                error={!registerForm.emailField.valid}
                                helperText={registerForm.emailField.valid ? '' : registerForm.emailField.errorMessage}
                                onChange={e => {
                                    e.preventDefault();
                                    handleRegisterFormEmailChange(registerForm.emailField, e.target.value);
                                }}
                                onBlur={e => {
                                    e.preventDefault();
                                    handleRegisterFormEmailValidation(registerForm.emailField);
                                }}
                                margin="dense"
                                fullWidth
                            />
                        </Grid>
{/*                        <Grid align='center' item xs={6}>
                            { availability.email !== undefined
                                ? (availability.email
                                    ? <Typography className={classes.green}>Email is available <OkIcon /></Typography>
                                    : <Typography className={classes.red}>Email is not available <NotOkIcon /></Typography>)
                                : <div> </div>
                            }
                        </Grid>*/}

                        <Grid item xs={6}>
                            <TextField
                                id='username'
                                name={registerForm.usernameField.name}
                                type='text'
                                label='Username'
                                value={registerForm.usernameField.value}
                                error={!registerForm.usernameField.valid}
                                helperText={registerForm.usernameField.valid ? '' : registerForm.usernameField.errorMessage}
                                onChange={e => {
                                    e.preventDefault();
                                    handleRegisterFormUsernameChange(registerForm.usernameField, e.target.value);
                                }}
                                onBlur={e => {
                                    e.preventDefault();
                                    handleRegisterFormUsernameValidation(registerForm.usernameField);
                                }}
                                margin="dense"
                                fullWidth
                            />
                        </Grid>
{/*                        <Grid align='center' item xs={6}>
                            { availability.username !== undefined
                                ? (availability.username
                                    ? <Typography className={classes.green}>Username is available <OkIcon /></Typography>
                                    : <Typography className={classes.red}>Username is not available <NotOkIcon /></Typography>)
                                : <div> </div>
                            }
                        </Grid>*/}

                        <Grid item xs={6}>
                            <TextField
                                id='password'
                                name={registerForm.passwordField.name}
                                type='password'
                                label='Password'
                                value={registerForm.passwordField.value}
                                error={!registerForm.passwordField.valid}
                                helperText={registerForm.passwordField.valid ? '' : registerForm.passwordField.errorMessage}
                                onChange={e => {
                                    e.preventDefault();
                                    handleRegisterFormPasswordChange(registerForm.passwordField, e.target.value);
                                }}
                                onBlur={e => {
                                    e.preventDefault();
                                    handleRegisterFormPasswordValidation(registerForm.passwordField);
                                }}
                                margin="dense"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id='repeatPassword'
                                name={registerForm.repeatPasswordField.name}
                                type='password'
                                label='Repeat password'
                                value={registerForm.repeatPasswordField.value}
                                error={!registerForm.repeatPasswordField.valid}
                                helperText={registerForm.repeatPasswordField.valid ? '' : registerForm.repeatPasswordField.errorMessage}
                                onChange={e => {
                                    e.preventDefault();
                                    handleRegisterFormRepeatPasswordChange(registerForm.repeatPasswordField, e.target.value);
                                }}
                                onBlur={e => {
                                    e.preventDefault();
                                    handleRegisterFormRepeatPasswordValidation(registerForm.repeatPasswordField);
                                }}
                                margin="dense"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography color='primary'>Required password rules:</Typography>
                        </Grid>
{/*                        <Grid item xs={12}>
                            <PasswordStrength {...passwordStrength} />
                        </Grid>*/}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary" >
                        Cancel
                    </Button>
                    <LoadingButton
                        isLoading={registerForm.onRegisterLoading}
                        disabled={ !areAllFieldsValid(registerForm) }
                        type='submit' color="primary" variant='outlined'>
                        Register
                    </LoadingButton>
                </DialogActions>
            </form>
        </React.Fragment>
    )
};

RegisterForm.propTypes = {
    registerForm: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
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


export default RegisterForm;

const areAllFieldsValid = (registerForm) => {
    return true;
    /*return !loginForm.onLoginLoading
        && InputFieldValidationService.validateEmail(
            loginForm.emailField.value).valid
        && InputFieldValidationService.validateInputLength(
            'password', loginForm.passwordField.value, MINIMUM_PASSWORD_LENGTH).valid*/
};