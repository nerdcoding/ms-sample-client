/*
 * LoginRegisterReducer.js
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

import {TOGGLE_LOGIN_REGISTER_DIALOG, SWITCH_LOGIN_REGISTER_DIALOG_TAB} from "../../../action/LoginRegisterAction";

export const isOpenReducer = (state=false, action) => {
    if (action.type === TOGGLE_LOGIN_REGISTER_DIALOG) {
        return !action.isOpen;
    }

    return state;
};

export const selectedTabReducer = (state=0, action) => {
    if (action.type === SWITCH_LOGIN_REGISTER_DIALOG_TAB) {
        return action.selectedTab;
    }

    return state;
};