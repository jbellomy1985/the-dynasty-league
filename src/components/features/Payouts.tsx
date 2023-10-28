import React from "react";
import { List, Map } from "immutable";

type TPayouts = {
    users?: List<Map<string, any>> | null;
    rosters?: List<Map<string, any>> | null;
}

export default function Payouts({
    users = null,
    rosters = null
}: TPayouts) {
    return (
        <div>Payout Info</div>
    );
};