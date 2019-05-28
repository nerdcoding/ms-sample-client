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

import React from "react";
import {Link, NavLink} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton} from "@material-ui/core";
import MoreIcon from '@material-ui/icons/MoreVert';

import MobileMenu from "./MobileMenu";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        paddingTop: '40px'
    },
    logo: {
        fontFamily: ['Rouge Script', 'sans-serif'],
        fontSize: 60,
        fontWeight: 500,
        textDecoration: 'none !important',
        height: 60,
        position: 'relative',
        top: -3,
        marginLeft: 20,
        marginRight: 20,
        '&:hover': {
            color: 'inherit'
        }
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        flexGrow: 1
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    button: {
        margin: theme.spacing(2),
        padding: '4px 32px'
    },
}));

/**
 * Renders the navbar (AppBar) on the top of the screen containing all router buttons.
 */
const NavigationBar = ({header, openMobileMenu, closeMobileMenu}) => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant='h1' color='inherit' className={classes.logo} component={NavLink} to="/">
                        Sample App
                    </Typography>

                    <div className={classes.sectionDesktop}>
                        <Button className={classes.button}
                                variant='contained'
                                size='small'
                                color='secondary'
                                component={React.forwardRef((props, ref) => (
                                    <Link to="/home" {...props} ref={ref} />
                                ))}
                        >
                            Home
                        </Button>

                        <Button className={classes.button}
                                variant='contained'
                                size='small'
                                color='secondary'
                                component={React.forwardRef((props, ref) => (
                                    <Link to="/about" {...props} ref={ref} />
                                ))}
                        >
                            About
                        </Button>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton aria-haspopup="true" onClick={e => openMobileMenu(e.currentTarget)} color="inherit">
                            <MoreIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

            <MobileMenu
                mobileMenuAnchorEl={header.mobileMenuAnchorEL}
                handleMobileMenuClose={closeMobileMenu}
            />
        </div>
    );
};

export default NavigationBar;