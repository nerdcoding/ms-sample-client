/*
 * restClientMiddleware.js
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

import {REST_REQUEST} from "../action/RestRequestAction";
import * as axios from "axios";
import {REST_REQUEST_TIMEOUT} from "../service/Constants";
import {changeGlobalMessage} from "../action/GlobalMessageAction";

export const restClientMiddleware = store => next => async action => {
    if (action[REST_REQUEST]) {
        const restRequest = action[REST_REQUEST];

        next({
            type: restRequest.type + '_IS_LOADING',
            isLoading: true
        });

        try {
            const response = await axios({
                method: restRequest.method,
                url: restRequest.endpoint,
                data: restRequest.payload,
                headers: restRequest.headers,
                timeout: REST_REQUEST_TIMEOUT
            });
            next({
                type: restRequest.type + '_SUCCESS',
                response: response.data
            });
            restRequest.subsequentActions.forEach(function (item) {
                next(item);
            });
        } catch (error) {
            next(changeGlobalMessage({
                isError: true,
                showMessage: true,
                messageText: restRequest.errorMessageText,
                errorResponse: error,
            }));
        }

        next({
            type: restRequest.type + '_IS_LOADING',
            isLoading: false
        });
    } else {
        return next(action);
    }
};
