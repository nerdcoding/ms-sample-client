/*
 * RestRequestAction.js
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

import {AuthenticationType} from "../middleware/auth/AuthenticationType";
import {HttpMethod} from "../middleware/HttpMethod";

export const REST_REQUEST = "REST_REQUEST";

export const requestRestEndpoint = (action) => {
    const restRequestTemplate = {
        type: "",
        authenticationType: AuthenticationType.BEARER,
        method: HttpMethod.GET,
        endpoint: null,
        payload: null,
        headers: {},
        error: {
            showErrorMessage: true,
            errorMessageText: '',
        },
        subsequentActions: {
            successActions: [],
            errorActions: []
        }
    };

    return {
        REST_REQUEST: { ...restRequestTemplate, ...action }
    };
};