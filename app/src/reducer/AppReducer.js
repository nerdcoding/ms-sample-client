/*
 * AppReducer.js
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

import {combineReducers} from "redux";
import {mobileMenuAnchorEL} from "./header/HeaderReducer";
import {loginFormReducer} from "./header/login/LoginFormReducer";
import {isOpenReducer,  selectedTabReducer} from "./header/login/LoginRegisterReducer";

export default combineReducers({
    header: combineReducers({
        mobileMenuAnchorEL,
        loginRegisterDialog: combineReducers({
            isOpen: isOpenReducer,
            selectedTab: selectedTabReducer,
            loginForm: loginFormReducer
        })
    })
});