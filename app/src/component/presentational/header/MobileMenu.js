/*
 * MobileMenu.js
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
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import {Link, NavLink} from "react-router-dom";
import React from "react";
import {Button} from "@material-ui/core";

/**
 * On small (mobile) screens the header doesn't not show the normal buttons but this MobileMenu instead. A MenuList will
 * contain the Header buttons.
 */
function MobileMenu({mobileMenuAnchorEl, handleMobileMenuClose}) {

    const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);

    return(
        <Popper open={isMobileMenuOpen}
                anchorEl={mobileMenuAnchorEl}
                transition disablePortal
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    id="mobile-menu"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleMobileMenuClose}>
                            <MenuList>
                                <MenuItem onClick={handleMobileMenuClose}
                                          component={React.forwardRef((props, ref) => (
                                              <Link to="/home" {...props} ref={ref} />
                                          ))}
                                >
                                    Home
                                </MenuItem>
                                <MenuItem onClick={handleMobileMenuClose}
                                          component={React.forwardRef((props, ref) => (
                                              <Link to="/about" {...props} ref={ref} />
                                          ))}
                                >
                                    About
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );

}

export default MobileMenu;