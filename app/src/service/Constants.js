/*
 * Constants.js
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

/** The minimum length of a password, used for validation during login and registration. */
export const MINIMUM_PASSWORD_LENGTH = 8;
/** When the GlobalMessageComponent shows a message, this message will auto hide during this milliseconds. */
export const GLOBAL_MESSAGE_AUTO_HIDE = 6000;
/** Timeout for requests to REST endpoints in milliseconds. */
export const REST_REQUEST_TIMEOUT = 30000;