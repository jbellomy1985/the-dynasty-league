import React from 'react';

// Material UI
import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// Styles
import './Header.scss';

// Web-Api
import {League} from '../web-api';

export type THeader = {
  league?: League | null;
  isLoading?: boolean;
}

function Header({league = null, isLoading = false}: THeader) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
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
            <Tooltip title="User Name">
              <IconButton sx={{ p: 0 }}>
                <AccountCircle fontSize="large" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default React.memo(Header);
