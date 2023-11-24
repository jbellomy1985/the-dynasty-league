import { Map } from "immutable";
import Roster from "./Roster";

export default class User {
    _teamName: string;
    _ID: string;
    _roster: Roster | null;
    constructor(data: Map<string, any> | null, roster: Roster | null) {
        const metaData = data?.get("metadata");
        this._teamName = metaData?.get("team_name") || data?.get("display_name");
        this._ID = data?.get("user_id");
        this._roster = roster;
    }

    getTeamName(): string {
        return this._teamName;
    }

    getID(): string {
        return this._ID;
    }

    getRoster(): Roster | null {
        return this._roster;
    }
}
