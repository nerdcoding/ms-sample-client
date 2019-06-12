/*
 * AuthenticationService.js
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

import RestClient from "../RestClient";

const sessionStorageAccessTokenKey = "access_token";
const sessionStorageRefreshTokenKey = "refresh_token";
const sessionStorageUserIdKey = "user_id";

const AuthenticationService = {
    isLoggedIn: function () {
        return sessionStorage.getItem(sessionStorageAccessTokenKey) !== null
            && sessionStorage.getItem(sessionStorageAccessTokenKey) !== "undefined";
    },
    login: function (access_token, refresh_token, user_id) {
        sessionStorage.setItem(sessionStorageAccessTokenKey, access_token);
        sessionStorage.setItem(sessionStorageRefreshTokenKey, refresh_token);
        sessionStorage.setItem(sessionStorageUserIdKey, user_id);
    },
    logout: function () {
        return RestClient.callAuthServerProtected.delete(
            '/token',
            {
                params: {
                    access_token: this.getTokens().access_token,
                    refresh_token: this.getTokens().refresh_token
                }
            }
        );
    },
    getTokens() {
        return this.isLoggedIn()
            ?   {
                access_token: sessionStorage.getItem(sessionStorageAccessTokenKey),
                refresh_token: sessionStorage.getItem(sessionStorageRefreshTokenKey)
            }
            :   {};
    },
    getUserId() {
        return this.isLoggedIn()
            ? sessionStorage.getItem(sessionStorageUserIdKey)
            : null;
    }
};

export default AuthenticationService;