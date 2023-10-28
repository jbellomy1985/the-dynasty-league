import React from "react";
import { List, Map } from "immutable";

type TCompareTeams = {
    users?: List<Map<string, any>> | null;
    rosters?: List<Map<string, any>> | null;
}

export default function CompareTeams({
    users = null,
    rosters = null
}: TCompareTeams) {
    return (
        <div>Teams Comparison Info</div>
    );
};