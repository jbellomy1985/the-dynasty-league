import React, { useState } from 'react';

// Material UI
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

// Components
import MyTeam from './features/MyTeam';
import Players from "./features/Players";
import Payouts from './features/Payouts';
import CompareTeams from './features/CompareTeams';
import History from './features/History';

const drawerWidth: number = 300;

enum Navigation {
    NONE,
    TEAM,
    COMPARE,
    PLAYERS,
    PAYOUTS,
    HISTORY
};

function Main() {
  const [navigation, setNavigation] = useState<Navigation>(Navigation.NONE);

  return (
    <Box sx={{ display: 'flex' }}>
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="league-navigation"
        >
            <Drawer
                variant="permanent"
                sx={{
                    marginTop: 64,
                    display: 'block',
                    '& .MuiDrawer-paper': {
                        top: 64,
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        height: "calc(100% - 64px)",
                        backgroundColor: "#e6e6e6",
                    },
                }}
                open
            >
                <Grid container direction="column" sx={{ height: "100%" }} justifyContent="space-between">
                    <Grid item>
                        <List>
                            <Typography variant="h3" sx={{ padding: "8px 24px"}}>Roster</Typography>
                            <Divider />
                            <ListItem>
                                <ListItemButton onClick={() => setNavigation(Navigation.TEAM)} sx={{ padding: "16px", justifyContent: "center" }}>
                                    <ListItemIcon><GroupsIcon fontSize="large" /></ListItemIcon> <Typography variant='h5'>My Team</Typography>
                                </ListItemButton>
                            </ListItem>
                            <Typography variant="h3" sx={{ marginTop: "8px", padding: "8px 24px"}}>League</Typography>
                            <Divider />
                            <ListItem>
                                <ListItemButton onClick={() => setNavigation(Navigation.COMPARE)} sx={{ padding: "16px", justifyContent: "center" }}>
                                    <ListItemIcon><CompareArrowsOutlinedIcon fontSize="large" /></ListItemIcon> <Typography variant='h5'>Compare Teams</Typography>
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton onClick={() => setNavigation(Navigation.PLAYERS)} sx={{ padding: "16px", justifyContent: "center" }}>
                                    <ListItemIcon><PersonSearchOutlinedIcon fontSize="large" /></ListItemIcon> <Typography variant='h5'>Players</Typography>
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton onClick={() => setNavigation(Navigation.PAYOUTS)} sx={{ padding: "16px", justifyContent: "center" }}>
                                    <ListItemIcon><LocalAtmOutlinedIcon fontSize="large" /></ListItemIcon> <Typography variant='h5'>Payouts</Typography>
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton onClick={() => setNavigation(Navigation.HISTORY)} sx={{ padding: "16px", justifyContent: "center" }}>
                                    <ListItemIcon><HistoryOutlinedIcon fontSize="large" /></ListItemIcon> <Typography variant='h5'>History</Typography>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item>
                        <List>
                            <ListItem>
                                <ListItemButton sx={{ padding: "16px", justifyContent: "flex-end" }}>
                                    <ListItemIcon><SettingsIcon fontSize="large" /></ListItemIcon> <Typography variant='h5'>Admin</Typography>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Drawer>
        </Box>
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
            {
                navigation === Navigation.NONE &&
                <div>Main Content</div>
            }
            {
                navigation === Navigation.TEAM &&
                <MyTeam />
            }
            {
                navigation === Navigation.COMPARE &&
                <CompareTeams />
            }
            {
                navigation === Navigation.PLAYERS &&
                <Players />
            }
            {
                navigation === Navigation.PAYOUTS &&
                <Payouts />
            }
            {
                navigation === Navigation.HISTORY &&
                <History />
            }
        </Box>
    </Box>
  );
}

export default React.memo(Main);
