import React from "react";

import { League } from "../../../web-api";

// Material UI
import {
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material';

type PayoutsType = {
    league?: League | null;
}

function Payouts({ league = null }: PayoutsType) {
    return (
        <>
            <Typography variant="h3" component="div">
                Items to be added
            </Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemText primary="Highest scorer payout" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Projected Payout (based on current Standings)" />
                </ListItem>
            </List>
        </>
    );
};

export default React.memo(Payouts);