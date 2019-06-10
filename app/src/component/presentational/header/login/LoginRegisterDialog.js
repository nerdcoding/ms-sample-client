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
function LoginRegisterDialog({isOpen, selectedTab, handleDialogToggle, handleTabSwitch}) {
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
                    ? <LoginForm />
                    : <RegisterForm />
                }
            </Dialog>
        </div>
    );
}

LoginRegisterDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    selectedTab: PropTypes.number.isRequired,
    handleDialogToggle: PropTypes.func.isRequired,
    handleTabSwitch: PropTypes.func.isRequired
};

export default LoginRegisterDialog;
