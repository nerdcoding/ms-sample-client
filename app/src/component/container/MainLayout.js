/*
 * Header.js
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

import {connect} from "react-redux";

import React from "react";
import Router from "../presentational/Router";
import {logout} from "../../action/header/logout/LogoutAction";

const mapStateToProps = state => ({
    authentication: state.authentication
});

const mapDispatchToProps = dispatch => ({
    logout: (accessToken, refreshToken) => dispatch(logout(accessToken, refreshToken))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Router)