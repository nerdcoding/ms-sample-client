/*
 * AuthenticationReducer.js
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


import {HANDLE_LOGIN_SUCCESS} from "../action/header/login/LoginFormAction";

export const initialAuthentication = {
    access_token: null,
    refresh_token: null,
    user_id: null
};

export const handleLoginSuccessReducer = (state=initialAuthentication, action) => {
    if (action.type === HANDLE_LOGIN_SUCCESS) {
        return {
            access_token: action.auth.access_token,
            refresh_token: action.auth.refresh_token,
            user_id: action.auth.user_id
        }
    }

    return state;
};