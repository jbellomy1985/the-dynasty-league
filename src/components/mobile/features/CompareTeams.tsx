import React from "react";

import { League } from "../../../web-api";

// Material UI
import {
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material';

type TCompare = {
    league?: League | null;
}

function CompareTeams({ league = null }: TCompare) {
    return (
        <>
            <Typography variant="h3" component="div">
                Items to be added
            </Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemText primary="Average Age by position (Graph)" secondary="League Comparison" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Average Points by position (Graph)" secondary="League Comparison" />
                </ListItem>
            </List>
        </>
    );
};

export default React.memo(CompareTeams);