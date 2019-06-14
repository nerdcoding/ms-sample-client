/*
 * MainLayout.js
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
import {Redirect, Route, Switch} from "react-router-dom";


import {Grid, makeStyles, Typography} from "@material-ui/core";

import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 320,
    },
    footer: {


    },
    sectionFooter: {
        position: 'relative',
        bottom: 0,
        width: '100%',
        marginTop: theme.customLayout.section.paddingTop,
        paddingTop: '30px',
        paddingBottom: theme.customLayout.section.paddingBottom,
        borderTopColor: theme.palette.grey["500"],
        borderTopWidth: '1px',
        borderTopStyle: 'solid'
    }
}));

const Router = ({authentication, logout}) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <main role="main">
                <Grid container justify='center' alignContent='center' >
                    <Switch>
                        <Route path='/home' component={HomePage} />
                        <PrivateRoute path='/about' component={AboutPage} authentication={authentication}  />
                        <Route path='/logout' render={() => {
                            logout();
                            return (<Redirect to='/' />)
                        }} />
                        <Redirect to="/home" />
                    </Switch>
                </Grid>
            </main>
            <footer role="footer">
                <Grid container justify='center' alignContent='center' >
                    <Grid item className={classes.sectionFooter} xs={2}  align="center"> </Grid>
                    <Grid item className={classes.sectionFooter} xs={8}  align="center">
                        <Typography variant='body2' component="p" >
                            Impressum + Datenschutz
                        </Typography>
                    </Grid>
                    <Grid item className={classes.sectionFooter} xs={2}  align="center"> </Grid>
                </Grid>
            </footer>
        </React.Fragment>
    );
};

export default Router;

/**
 * 'PrivateRoute' always redirects to '/' when user is not logged in.
 */
const PrivateRoute = ({ component: Component, authentication, ...rest }) => (
    <Route {...rest} render={(props) => (
        isLoggedIn(authentication)
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
);

const isLoggedIn = (authentication) => {
    return authentication && authentication.access_token;
};