/*
 * LogoutAction.js
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

import {requestRestEndpoint} from "../../RestRequestAction";
import {AuthenticationType} from "../../../middleware/auth/AuthenticationType";
import {HttpMethod} from "../../../middleware/HttpMethod";

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const logout = (authentication) => {
    return requestRestEndpoint({
        type: LOGOUT,
        authenticationType: AuthenticationType.BEARER,
        method: HttpMethod.DELETE,
        endpoint: process.env.AUTH_SERVER_URL + '/token' +
            '?access_token=' + authentication.access_token +
            '&refresh_token=' + authentication.refresh_token,
        error: {
            showErrorMessage: false,
            errorMessageText: '',
        },
        subsequentActions: {
            successActions: [],
            errorActions: [{ type: LOGOUT_SUCCESS }] // Even if logout failed at the server, logout at the client.
        }
    });
};