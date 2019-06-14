/*
 * ProfileMenu.js
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
import React from "react";
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    menu: {
        zIndex: '1200', // menu needs to be in front of the appbar
    },
}));
function ProfileMenu({profileMenuAnchorEl, handleProfileMenuClose}) {
    const classes = useStyles();
    const isProfileMenuOpen = Boolean(profileMenuAnchorEl);

    return (
        <Popper open={isProfileMenuOpen}
                anchorEl={profileMenuAnchorEl}
                transition disablePortal
                className={classes.menu}
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    id="profile-menu"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleProfileMenuClose}>
                            <MenuList>
                                <MenuItem onClick={handleProfileMenuClose}
                                          component={React.forwardRef((props, ref) => (
                                              <Link to="/profile" {...props} ref={ref} />
                                          ))}
                                >
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleProfileMenuClose}
                                          component={React.forwardRef((props, ref) => (
                                              <Link to="/account" {...props} ref={ref} />
                                          ))}
                                >
                                    My account
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleProfileMenuClose}
                                          component={React.forwardRef((props, ref) => (
                                              <Link to="/logout" {...props} ref={ref} />
                                          ))}
                                >
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
}

export default ProfileMenu;