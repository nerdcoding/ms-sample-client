/*
 * store.js
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

import {applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import AppReducer from "./reducer/AppReducer";

import DevTools from './component/container/DevTools';

const sessionStorageAuthenticationTokenKey = "authentication";

const saveAuthentication2LocalStorage = (state) => {
    if (state.authentication && state.authentication.access_token) {
        sessionStorage.setItem(sessionStorageAuthenticationTokenKey, JSON.stringify(state.authentication));
    }
};

export const createApplicationStore = () => {
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

    store.subscribe(() => {
        saveAuthentication2LocalStorage(store.getState())
    });

    return store;
};