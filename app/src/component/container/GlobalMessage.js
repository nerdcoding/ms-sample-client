/*
 * GlobalMessage.js
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

import React from "react";
import {changeGlobalMessage} from "../../action/GlobalMessageAction";
import GlobalMessageComponent from "../presentational/util/GlobalMessageComponent";
import {initialGlobalMessage} from "../../reducer/GlobalMessageReducer";
import {connect} from "react-redux";



const mapStateToProps = state => ({
    globalMessage: state.globalMessage
});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(changeGlobalMessage(initialGlobalMessage)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GlobalMessageComponent)