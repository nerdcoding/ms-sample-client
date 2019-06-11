/*
 * App.js
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
import {BrowserRouter} from "react-router-dom";

import {applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {Provider} from "react-redux";

import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import {MuiPickersUtilsProvider} from "material-ui-pickers";
import MomentUtils from "@date-io/moment";

import theme from "./../theme";
import AppReducer from "../reducer/AppReducer";
import Header from "./container/Header";
import GlobalMessage from "./container/GlobalMessage";
import DevTools from './container/DevTools';
import MainLayout from "./presentational/MainLayout";

let store;
if (process.env.ENVIRONMENT === 'dev') {
    const storeEnhancer = compose(
        applyMiddleware(thunkMiddleware),
        DevTools.instrument()
    );
    store = createStore(AppReducer, {}, storeEnhancer);
} else {
    store = createStore(AppReducer, applyMiddleware(thunkMiddleware));
}

export default function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <Provider store={store}>
                    <CssBaseline />

                    <BrowserRouter>
                        <GlobalMessage />
                        <Header />
                        <MainLayout />

                        <DevTools />
                    </BrowserRouter>
                </Provider>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    );
}