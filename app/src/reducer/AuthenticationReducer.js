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


import {LOGIN_SUCCESS} from "../action/header/login/LoginFormAction";
import { LOGOUT_SUCCESS} from "../action/header/logout/LogoutAction";

export const initialAuthentication = {
    access_token: null,
    refresh_token: null,
    user_id: null
};

export const authenticationReducer = (state=initialAuthentication, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                access_token: action.response.access_token,
                refresh_token: action.response.refresh_token,
                user_id: action.response.user_id
            };
        case LOGOUT_SUCCESS:
            return initialAuthentication;
        default:
            return state;
    }
};