import React from 'react';

// Material UI
import {
  Avatar,
  Divider,
  Menu,
  MenuItem,
  MenuList,
} from '@mui/material';

// Context
import useUser from '../context/useUser';

export type HeaderMenuType = {
    anchorEl?: null | HTMLElement;
    onClose?: null | Function;
    onSigninClick?: null | Function;
    onSignOutClick?: null | Function;
}

function HeaderMenu({ anchorEl = null, onClose = null, onSigninClick = null, onSignOutClick = null }: HeaderMenuType) {

    const { user } = useUser();

    return (
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={() => { onClose?.(); }}
        onClick={() => { onClose?.(); }}
        slotProps={{
            paper: {
            elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                },
                '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                },
            },
            }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {
                !user.isSignedIn &&
                <MenuItem onClick={() => { onSigninClick?.(); }}>
                    <Avatar /> Sign in
                </MenuItem>
            }
            {
                user.isSignedIn &&
                <MenuList>
                    <MenuItem>
                        <Avatar /> My Account
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => { onSignOutClick?.(); }} >
                        Sign Out
                    </MenuItem>
                </MenuList>
                
            }
        </Menu>
    );
}

export default React.memo(HeaderMenu);
