/*
 * LoginRegisterAction.js
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

export const TOGGLE_LOGIN_REGISTER_DIALOG = 'TOGGLE_LOGIN_REGISTER_DIALOG';
export const SWITCH_LOGIN_REGISTER_DIALOG_TAB = 'SWITCH_LOGIN_REGISTER_DIALOG_TAB';

export const toggleLoginRegisterDialog = (isOpen) => {
    return {
        type: TOGGLE_LOGIN_REGISTER_DIALOG,
        isOpen
    }
};

export const switchLoginRegisterDialogTab = (selectedTab) => {
    return {
        type: SWITCH_LOGIN_REGISTER_DIALOG_TAB,
        selectedTab
    }
};