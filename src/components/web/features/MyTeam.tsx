import React from "react";

import { League } from "../../../web-api";

// Material UI
import {
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material';

type MyTeamType = {
    league?: League | null;
}

function MyTeam({ league = null }: MyTeamType) {
    return (
        <>
            <Typography variant="h3" component="div">
                Items to be added
            </Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemText primary="Roster List" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Average Age by position (Graph)" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Average Points by position (Graph)" />
                </ListItem>
            </List>
        </>
    );
};

export default React.memo(MyTeam);