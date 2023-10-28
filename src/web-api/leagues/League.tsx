import { Map } from "immutable";

enum Status {
    in_season = "in_season"
};

export default class League {
    static ID: string = "995785140678815744";
    static SPORT: string = "nfl";
    _name: string;
    _season: number;
    _status: string;
    _teams: number;
    constructor(data: Map<string, any>) {
        this._name = data?.get("name");
        this._season = data?.get("season");
        this._status = data?.get("status");
        this._teams = data?.get("total_rosters");
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
        return this._teams;
    }
}
