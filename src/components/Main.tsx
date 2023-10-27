import React from 'react';

// Material UI
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth: number = 300;

function Main() {
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
                                <ListItemButton sx={{ padding: "16px", justifyContent: "center" }}>
                                    <ListItemIcon><GroupsIcon fontSize="large" /></ListItemIcon> <Typography variant='h5'>My Team</Typography>
                                </ListItemButton>
                            </ListItem>
                            <Typography variant="h3" sx={{ padding: "8px 24px"}}>League</Typography>
                            <Divider />
                            <ListItem>
                                <ListItemButton sx={{ padding: "16px", justifyContent: "center" }}>
                                    <ListItemIcon><CompareArrowsOutlinedIcon fontSize="large" /></ListItemIcon> <Typography variant='h5'>Compare Teams</Typography>
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton sx={{ padding: "16px", justifyContent: "center" }}>
                                    <ListItemIcon><PersonSearchOutlinedIcon fontSize="large" /></ListItemIcon> <Typography variant='h5'>Players</Typography>
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton sx={{ padding: "16px", justifyContent: "center" }}>
                                    <ListItemIcon><LocalAtmOutlinedIcon fontSize="large" /></ListItemIcon> <Typography variant='h5'>Payouts</Typography>
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
            Main Content Goes here
        </Box>
    </Box>
  );
}

export default React.memo(Main);
