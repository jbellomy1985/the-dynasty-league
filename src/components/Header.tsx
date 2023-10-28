import React from 'react';

// Material UI
import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// Styles
import './Header.scss';

// Web-Api
import {League} from '../web-api';

export type THeader = {
  league?: League | null;
}

function Header({league = null}: THeader) {
  
  const leagueName = league?.getName();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" component="div" sx={{ marginLeft: "8px" }}>
            {leagueName}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex' }, marginLeft: "64px", justifyContent: "space-around"}}>
            <Typography variant="h4" noWrap>Season: <span className="Header">{league?.getSeason()}</span></Typography>
            <Typography variant="h4" sx={{marginLeft: "32px"}} noWrap>Status: <span className="Header">{league?.getStatus()}</span></Typography>
            <Typography variant="h4" sx={{marginLeft: "32px"}} noWrap>Teams: <span className="Header">{league?.getNumberOfTeams()}</span></Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
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
