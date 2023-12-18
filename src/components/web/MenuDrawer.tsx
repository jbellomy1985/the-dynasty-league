import React, { useCallback } from 'react';

// Material UI
import {
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

// Utils
import Navigation from '../../utils/Navigation';

// Context
import useUser from '../../context/useUser';

type MenuDrawerType = {
    drawerWidth: number;
    headerHeight: number;
    onNavigationChange: Function;
}

function MenuDrawer({ drawerWidth, headerHeight, onNavigationChange }: MenuDrawerType) {

    const { user } = useUser();

    const handleMyTeamClick = useCallback(() => {
        if(user.isSignedIn) {
            onNavigationChange(Navigation.TEAM);
        }
    }, []);

    return (
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
                            <ListItemButton onClick={() => onNavigationChange?.(Navigation.DASHBOARD)} sx={{ padding: "16px", justifyContent: "center" }}>
                                <ListItemIcon><HomeIcon fontSize="large" /></ListItemIcon> <Typography variant='h5'>Dashboard</Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => onNavigationChange?.(Navigation.RULES)} sx={{ padding: "16px", justifyContent: "center" }}>
                                <ListItemIcon><GavelIcon fontSize="large" /></ListItemIcon> <Typography variant='h5'>League Rules</Typography>
                            </ListItemButton>
                        </ListItem>
                        {
                            user.isSignedIn &&
                            <>
                                <Typography variant="h3" sx={{ padding: "8px 24px"}}>Roster</Typography>
                                <Divider />
                                <ListItem>
                                    <ListItemButton onClick={handleMyTeamClick} sx={{ padding: "16px", justifyContent: "center" }}>
                                        <ListItemIcon><GroupsIcon fontSize="large" /></ListItemIcon> <Typography variant='h5'>My Team</Typography>
                                    </ListItemButton>
                                </ListItem>
                            </>
                        }
                        <Typography variant="h3" sx={{ marginTop: "8px", padding: "8px 24px"}}>League</Typography>
                        <Divider />
                        <ListItem>
                            <ListItemButton onClick={() => onNavigationChange(Navigation.COMPARE)} sx={{ padding: "16px", justifyContent: "center" }}>
                                <ListItemIcon><CompareArrowsOutlinedIcon fontSize="large" /></ListItemIcon> <Typography variant='h5'>Compare Teams</Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => onNavigationChange(Navigation.PAYOUTS)} sx={{ padding: "16px", justifyContent: "center" }}>
                                <ListItemIcon><LocalAtmOutlinedIcon fontSize="large" /></ListItemIcon> <Typography variant='h5'>Payouts</Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => onNavigationChange(Navigation.HISTORY)} sx={{ padding: "16px", justifyContent: "center" }}>
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
    );
}

export default React.memo(MenuDrawer);
