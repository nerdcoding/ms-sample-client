/*
 * Error.js
 *
 * Copyright (c) 2019 <ABC*GmbH>, All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of <ABC*GmbH>. The intellectual and technical concepts contained
 * herein are proprietary to <ABC*GmbH> and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from <ABC*GmbH>.  Access to the source code contained herein is hereby forbidden to anyone except current <ABC*GmbH> employees, managers or contractors who have executed 
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 * 
 * The copyright notice above does not evidence any actual or intended publication or disclosure  of  this source code, which includes  
 * information that is confidential and/or proprietary, and is a trade secret, of  <ABC*GmbH>.   ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC  PERFORMANCE, 
 * OR PUBLIC DISPLAY OF OR THROUGH USE  OF THIS  SOURCE CODE  WITHOUT  THE EXPRESS WRITTEN CONSENT OF <ABC*GmbH> IS STRICTLY PROHIBITED, AND IN VIOLATION OF APPLICABLE 
 * LAWS AND INTERNATIONAL TREATIES.  THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY ANY RIGHTS  
 * TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
 */

'use strict';

import * as React from "react";

import {IconButton, makeStyles, Snackbar, SnackbarContent} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import SuccessIcon from "@material-ui/icons/CheckCircleOutline";
import {GLOBAL_MESSAGE_AUTO_HIDE} from "../../../service/Constants";


const useStyles = makeStyles(theme => ({
    error: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.text.primary
    },
    success: {
        backgroundColor: theme.palette.success,
        color: theme.palette.text.primary
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    closeButton: {
        padding: theme.spacing(0.5)
    },
}));

function GlobalMessageComponent({globalMessage, onClose}) {
        const { isError, showMessage, messageText, errorResponse} = globalMessage;
        const classes = useStyles();

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={showMessage}
                autoHideDuration={GLOBAL_MESSAGE_AUTO_HIDE}
                onClose={onClose}
            >
                <SnackbarContent
                    className={isError ? classes.error : classes.success}
                    aria-describedby="message-id"
                    message={isError
                                ?   <span id="message-id" className={classes.message}>
                                        <ErrorIcon className={`${classes.icon} ${classes.iconVariant}`}/>
                                        {showMessage ? createErrorMessage(errorResponse, messageText) : ''}
                                    </span>
                                :   <span id="message-id" className={classes.message}>
                                        <SuccessIcon className={`${classes.icon} ${classes.iconVariant}`}/>
                                        {showMessage ? messageText : ''}
                                    </span>
                        }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.closeButton}
                            onClick={onClose}
                        >
                            <CloseIcon className={classes.icon} />
                        </IconButton>,
                    ]}
                />
            </Snackbar>
        );
}

function createErrorMessage(errorResponse, businessErrorMessage) {
    if (errorResponse.response
            && errorResponse.response.status >= 400
            && errorResponse.response.status <= 499) {
        return businessErrorMessage;
    } else if (errorResponse.message
            && errorResponse.message === 'Network Error')
        return "The server is currently not available. Please try again later.";
    else {
        return "An unknown server error occurred. Please try again later.";
    }
}

export default GlobalMessageComponent;






