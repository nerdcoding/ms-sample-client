/*
 * PasswordStength.js
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
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import OkIcon from "@material-ui/icons/CheckCircleOutline";
import NotOkIcon from "@material-ui/icons/ErrorOutline";
import {makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    green: {
        color: theme.palette.success
    },
    red: {
        color: theme.palette.error.main
    }
}));

const PasswordStrength = ({
            atLeastEightCharacters, atLeastOneNumber,
            atLeastOneCapitalLetter, atLeastOneSpecialCharacter }) => {
    const classes = useStyles();
    return (
        <Grid container spacing={0}>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={1}>
                {atLeastEightCharacters && <OkIcon className={classes.green} />}
                {!atLeastEightCharacters && <NotOkIcon className={classes.red} />}
            </Grid>
            <Grid item xs={4}>
                <Typography className={atLeastEightCharacters ? classes.green : classes.red}
                            color='textSecondary'>
                    At least 8 character.
                </Typography>
            </Grid>

            <Grid item xs={1}>
                {atLeastOneNumber && <OkIcon className={classes.green} />}
                {!atLeastOneNumber && <NotOkIcon className={classes.red} />}
            </Grid>
            <Grid item xs={5}>
                <Typography className={atLeastOneNumber ? classes.green : classes.red}
                            color='textSecondary'>
                    At least one number.
                </Typography>
            </Grid>

            <Grid item xs={1}>
            </Grid>
            <Grid item xs={1}>
                {atLeastOneCapitalLetter && <OkIcon className={classes.green} />}
                {!atLeastOneCapitalLetter && <NotOkIcon className={classes.red} />}
            </Grid>
            <Grid item xs={4}>
                <Typography className={atLeastOneCapitalLetter ? classes.green : classes.red}
                            color='textSecondary'>
                    At least one capital letter.
                </Typography>
            </Grid>

            <Grid item xs={1}>
                {atLeastOneSpecialCharacter && <OkIcon className={classes.green} />}
                {!atLeastOneSpecialCharacter && <NotOkIcon className={classes.red} />}
            </Grid>
            <Grid item xs={5}>
                <Typography className={atLeastOneSpecialCharacter ? classes.green : classes.red}
                            color='textSecondary'>
                    At least one special character.
                </Typography>
            </Grid>
        </Grid>
    );
};

PasswordStrength.propTypes = {
    atLeastEightCharacters: PropTypes.bool.isRequired,
    atLeastOneNumber: PropTypes.bool.isRequired,
    atLeastOneCapitalLetter: PropTypes.bool.isRequired,
    atLeastOneSpecialCharacter: PropTypes.bool.isRequired,
};

export default PasswordStrength;