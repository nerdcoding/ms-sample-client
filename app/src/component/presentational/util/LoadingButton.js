/*
 * LoadingButton.js
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

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as React from "react";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing.unit,
    }
}));

const LoadingButton = ({ isLoading, ...other }) => {
    const classes = useStyles();

    if (isLoading) {
        return (
            <Button className={classes.button} {...other}>
                <CircularProgress disableShrink={true} size={24} color='primary' />
            </Button>
        );
    } else {
        return (
            <Button className={classes.button} {...other} />
        )
    }
};

LoadingButton.propTypes = {
    classes: PropTypes.object.isRequired,
    isLoading: PropTypes.bool
};

LoadingButton.defaultProps = {
    isLoading: false
};

export default LoadingButton;
