import { List, Map } from "immutable";
import User from "../users/User";
import NFLState from "../nflState/NFLState";

export default class League {
    static ID: string = "995785140678815744";
    static SPORT: string = "nfl";
    _name: string;
    _season: number;
    _status: string;
    _numTeams: number;
    _users: User[] | null;
    _nflState: NFLState | null;
    constructor(data: Map<string, any> | null, users: User[] | null, nflState: NFLState | null) {
        this._name = data?.get("name");
        this._season = data?.get("season");
        this._status = data?.get("status");
        this._numTeams = data?.get("total_rosters");
        this._users = users;
        this._nflState = nflState;
    }

    getName(): string {
        return this._name;
    }

    getSeason(): number {
        return this._season;
    }

    getStatus(): string {
        return this._status;
    }

    getNumberOfTeams(): number {
        return this._numTeams;
    }

    getUsers(): User[] | null {
        return this._users;
    }

    getNFLState(): NFLState | null {
        return this._nflState;
    }
}
