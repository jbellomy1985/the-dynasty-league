import React, { ReactElement, useState } from 'react';

// Material UI
import {
    Box,
    Divider,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Typography
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GavelIcon from '@mui/icons-material/Gavel';
import GroupsIcon from '@mui/icons-material/Groups';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

// Components
import MyTeam from './features/MyTeam';
import LeagueRules from "./features/LeagueRules/LeagueRules";
import Payouts from './features/Payouts';
import CompareTeams from './features/CompareTeams';
import History from './features/History';

// Web-Api
import { League } from '../../web-api';

const drawerWidth: number = 300;
const headerHeight: number = 64;

enum Navigation {
    DASHBOARD,
    RULES,
    TEAM,
    COMPARE,
    PAYOUTS,
    HISTORY
};

type TMain = {
    league?: League | null;
    isLoading: boolean,
    leagueError?: ReactElement<any, any> | null;
}

function Main({ league = null, isLoading = false, leagueError = null }: TMain) {
  const [navigation, setNavigation] = useState<Navigation>(Navigation.DASHBOARD);

  return (
    <Box sx={{ display: 'flex', marginTop: `${headerHeight}px` }}>
        <Box
            component="nav"
            sx={{ width: { lg: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="league-navigation"
        >
            <Drawer
                variant="permanent"
                sx={{
                    '& .MuiDrawer-paper': {
                        top: headerHeight,
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        height: `calc(100% - ${headerHeight}px)`,
                        backgroundColor: "#e6e6e6",
                    },
                }}
                open
            >
                <Grid container direction="column" sx={{ height: "100%" }} justifyContent="space-between">
                    <Grid item>
                        <List>
                            <ListItem>
                                <ListItemButton onClick={() => setNavigation(Navigation.DASHBOARD)} sx={{ padding: "16px", justifyContent: "center" }}>
                                    <ListItemIcon><HomeIcon fontSize="large" /></ListItemIcon> <Typography variant='h5'>Dashboard</Typography>
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton onClick={() => setNavigation(Navigation.RULES)} sx={{ padding: "16px", justifyContent: "center" }}>
                                    <ListItemIcon><GavelIcon fontSize="large" /></ListItemIcon> <Typography variant='h5'>League Rules</Typography>
                                </ListItemButton>
                            </ListItem>
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
            aria-label="main-content"
            component="main"
            sx={{ flexGrow: 1, p: 3 }}
        >
            {leagueError}
            {
                navigation === Navigation.DASHBOARD &&
                <>
                    Main Content goes here (Maybe League news, or something of that nature... Almost like a dashboard)
                </>
            }
            {
                navigation === Navigation.RULES &&
                <LeagueRules />
            }
            {
                navigation === Navigation.TEAM &&
                <MyTeam league={league} />
            }
            {
                navigation === Navigation.COMPARE &&
                <CompareTeams league={league} />
            }
            {
                navigation === Navigation.PAYOUTS &&
                <Payouts league={league} />
            }
            {
                navigation === Navigation.HISTORY &&
                <History league={league} />
            }
        </Box>
    </Box>
  );
}

export default React.memo(Main);
