import React, { useMemo } from "react";
import { List, Map } from "immutable";

import { NFLState, Roster, User } from "../../web-api";


type TPayouts = {
    users?: List<Map<string, any>> | null;
    rosters?: List<Map<string, any>> | null;
    nflState?: NFLState | null;
}

function buildPayoutMap(users: TPayouts["users"], rosters: TPayouts["rosters"], nflState: TPayouts["nflState"]) {
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
        <div>Payout Info</div>
    );
};

export default React.memo(Payouts);