/*
 * theme.js
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

import {createMuiTheme} from "@material-ui/core/styles";
import {cyan, pink} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            light: cyan['500'],
            main: cyan['500'],
            dark: cyan['800'],
            contrastText: "#fff"
        },
        secondary: {
            light: pink['A200'],
            main: pink['A200'],
            dark: pink['A400'],
            contrastText: "#fff"
        },
        error: {
            light: "#e57373",
            main: "#f44336",
            dark: "#d32f2f",
            contrastText: "#fff"
        },
        success: '#66bb6a'
    },
    customLayout: {
        section: {
            paddingTop: '60px',
            paddingBottom: '60px',
        }
    }
});

export default theme;