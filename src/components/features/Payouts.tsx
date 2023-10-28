import React, { useMemo } from "react";
import { List as ImmutableList, Map } from "immutable";

// Material UI
import {
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material';

import { NFLState, Roster, User } from "../../web-api";

type TPayouts = {
    users?: ImmutableList<Map<string, any>> | null;
    rosters?: ImmutableList<Map<string, any>> | null;
    nflState?: NFLState | null;
}

function buildPayoutMap(
    users: TPayouts["users"],
    rosters: TPayouts["rosters"],
    nflState: TPayouts["nflState"]
): Map<string, any> {
    const payoutMap: Map<string, any> = Map<string, any>();

    return payoutMap;
}

function Payouts({
    users = null,
    rosters = null,
    nflState = null
}: TPayouts) {

    const payoutMap: Map<string, any> = useMemo(() => buildPayoutMap(users, rosters, nflState), [users, rosters, nflState]);

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