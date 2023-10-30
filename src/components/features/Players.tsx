import React from "react";

import { League } from "../../web-api";

// Material UI
import {
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material';

type TPlayers = {
    league?: League | null;
}

function Players({ league = null }: TPlayers) {
    return (
        <>
            <Typography variant="h3" component="div">
                Items to be added
            </Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemText primary="Player List with custom filters and data points (age, avg fpts / game, etc..." />
                </ListItem>
            </List>
        </>
    );
};

export default React.memo(Players);