import React, {useCallback, useState} from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// Styles
import logo from '../logo.svg';

function Header() {
  const [loggedIn, setLoggedIn] = useState<boolean>(true); // TODO: Add a true login method that will hit an API and log in
  const [anchorElementUser, setAnchorElementUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElementUser(event.currentTarget);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElementUser(null);
  }, []);

  const handleLogIn = useCallback(() => {
    handleCloseUserMenu();
    setLoggedIn(true);
  }, [handleCloseUserMenu]);

  const handleLogOut = useCallback(() => {
    handleCloseUserMenu();
    setLoggedIn(false);
  }, [handleCloseUserMenu]);

  // TODO: Add the league Avatar using the Sleeper Avatar API

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sleepr Dynasty
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {
                  loggedIn && <Avatar alt="Remy Sharp" src={logo} />
                }
                {
                  !loggedIn && <AccountCircle fontSize="large" />
                }
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElementUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElementUser)}
              onClose={handleCloseUserMenu}
            >
              {
                loggedIn &&
                <MenuItem onClick={handleLogOut}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              }
              {
                !loggedIn &&
                <MenuItem onClick={handleLogIn}>
                  <Typography textAlign="center">Sign In</Typography>
                </MenuItem>
              }
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default React.memo(Header);
