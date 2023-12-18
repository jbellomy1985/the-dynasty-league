import React, { useCallback, useState } from 'react';

// Material UI
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Skeleton,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';

// Web-Api
import { League, LoginAPI } from '../web-api';

// Components
import HeaderMenu from './HeaderMenu';

export type HeaderType = {
  league: League;
  isLoading?: boolean;
  onMyAccountClick?: null | Function;
  onSigninClick?: null | Function;
}

function Header({
  league,
  isLoading = false,
  onMyAccountClick = null,
  onSigninClick = null
}: HeaderType) {
  const [error, setError] = useState<null | string>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSignIn = useCallback(() => {
    handleMenuClose();
    onSigninClick?.();
  }, []);

  const handleSignOut = useCallback(() => {
    handleMenuClose();
    setError(null);
    LoginAPI.handleSignOut()
      .catch((error: any) => {
          setError(error.message);
      })
}, []);

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {
            isLoading ? <Skeleton variant="circular" width={40} height={40} /> : <Avatar src={league.getAvatarThumbLink()} />
          }
          <Typography variant="h4" component="div" sx={{ display: { sm: "block", md: "none" }, marginLeft: "8px" }}>
            {isLoading ? <Skeleton variant="text" sx={{ width: "188px"}} /> : league?.getName()}
          </Typography>
          <Typography variant="h3" component="div" sx={{ display: { xs: "none", md: "block" }, marginLeft: "8px" }}>
            {isLoading ? <Skeleton variant="text" sx={{ width: "262px"}} /> : league?.getName()}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", lg: 'flex' }, marginLeft: "64px", justifyContent: "space-around"}}>
            <Typography variant="h4" noWrap>
              Season: <span className="Header">{isLoading ? <Skeleton variant="text" sx={{ width: "79px"}} /> : league?.getNFLState()?.getSeason()}</span>
            </Typography>
            <Typography variant="h4" sx={{marginLeft: "32px"}} noWrap>
              Status: <span className="Header">{isLoading ? <Skeleton variant="text" sx={{ width: "155px"}} /> : league?.getStatus()}</span>
            </Typography>
            <Typography variant="h4" sx={{marginLeft: "32px"}} noWrap>
              Teams: <span className="Header">{isLoading ? <Skeleton variant="text" sx={{ width: "39px"}} /> : league?.getNumberOfTeams()}</span>
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0, position: "fixed", right: 16 }}>
            <Tooltip title={error || "The Bench Warmers"}>
              <IconButton
                sx={{ p: 0 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleAvatarClick}
              >
                <Badge invisible={!error} badgeContent={1} color="error">
                  <Avatar /*src="https://sleepercdn.com/uploads/e5eca7cd7020e9f441ae2b2cbd110c0a"*/ />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
          <HeaderMenu
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            onMyAccountClick={onMyAccountClick}
            onSigninClick={handleSignIn}
            onSignOutClick={handleSignOut}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default React.memo(Header);
