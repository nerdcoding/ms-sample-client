/*
 * HeaderReducer.js
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

import {TOGGLE_MOBILE_MENU} from "../../action/HeaderAction";
import loginRegisterDialog from "./LoginRegisterReducer";
import {combineReducers} from "redux";

const initialHeaderState = {
    mobileMenuAnchorEL: null
};

const header = (state=initialHeaderState, action) => {
    switch (action.type) {
        case TOGGLE_MOBILE_MENU:
            return {
                ...state,
                mobileMenuAnchorEL: action.mobileMenuAnchorEL
            };
        default:
            return state;
    }

};

export default combineReducers({
    header,
    loginRegisterDialog
});