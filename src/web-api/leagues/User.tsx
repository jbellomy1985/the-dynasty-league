import { Map } from "immutable";
import Roster from "./Roster";

export default class User {
    _ID: string;
    _teamName: string;
    _avatarLink: string;
    _roster: Roster;
    constructor(data: Map<string, any>, roster: Roster) {
        const metaData = data.get("metadata");
        this._teamName = metaData.get("team_name") || data.get("display_name");
        this._ID = data.get("user_id");
        this._avatarLink = metaData.get("avatar") || `https://sleepercdn.com/avatars/thumbs/${data.get("avatar")}`;
        this._roster = roster;
    }

    getTeamName(): string {
        return this._teamName;
    }

    getID(): string {
        return this._ID;
    }

    getAvatarLink(): string | null {
        return this._avatarLink;
    }

    getRoster(): Roster {
        return this._roster;
    }
}
