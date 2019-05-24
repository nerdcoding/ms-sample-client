/*
 * RestClient.js
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


import {AUTH_SERVER_PASSWORD, AUTH_SERVER_URL, AUTH_SERVER_USER} from "../constants";
import * as axios from "axios";

/**
 * Axios based REST client to call endpoints of the authorization server.
 */
const callAuthServer = axios.create({
    baseURL: AUTH_SERVER_URL,
    auth: {
        username: AUTH_SERVER_USER,
        password: AUTH_SERVER_PASSWORD
    },
    timeout: 5000
});

const RestClient = {
    callAuthServer
};

export default RestClient;