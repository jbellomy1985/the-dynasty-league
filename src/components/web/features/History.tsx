import React from "react";

import { League } from "../../../web-api";

// Material UI
import {
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material';

type HistoryType = {
    league?: League | null;
}

function History({ league = null }: HistoryType) {
    return (
        <>
            <Typography variant="h3" component="div">
                Items to be added
            </Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemText primary="League History" secondary="Average Placement by User" />
                </ListItem>
            </List>
        </>
    );
};

export default React.memo(History);