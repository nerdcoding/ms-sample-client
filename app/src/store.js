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
import AppReducer from "./reducer/AppReducer";

import DevTools from './component/container/DevTools';
import {restClientMiddleware} from "./middleware/RestClientMiddleware";

const sessionStorageAuthenticationTokenKey = "authentication";

const saveAuthenticationToLocalStorage = (state) => {
    if (state.authentication && state.authentication.access_token) {
        sessionStorage.setItem(sessionStorageAuthenticationTokenKey, JSON.stringify(state.authentication));
    } else {
        sessionStorage.removeItem(sessionStorageAuthenticationTokenKey);
    }
};

const loadAuthenticationFromLocalStorage = () => {
    const authentication = JSON.parse(sessionStorage.getItem(sessionStorageAuthenticationTokenKey)) || undefined;
    return { authentication }
};

export const createApplicationStore = () => {
    let store;
    if (process.env.ENVIRONMENT === 'dev') {
        const storeEnhancer = compose(
            applyMiddleware(restClientMiddleware),
            DevTools.instrument()
        );
        store = createStore(AppReducer, loadAuthenticationFromLocalStorage(), storeEnhancer);
    } else {
        store = createStore(AppReducer, loadAuthenticationFromLocalStorage(), applyMiddleware(restClientMiddleware));
    }

    store.subscribe(() => {
        saveAuthenticationToLocalStorage(store.getState())
    });

    return store;
};