import { Map } from "immutable";

export default class User {
    _teamName: string;
    _ID: string;
    constructor(data: Map<string, any>) {
        const metaData = data?.get("metadata");
        this._teamName = metaData?.get("team_name");
        this._ID = data?.get("user_id");
    }

    getTeamName(): string {
        return this._teamName;
    }

    getID(): string {
        return this._ID;
    }
}
