import { Map } from "immutable";

export default class Matchup {
    _ID: string;
    _rosterID: string;
    _points: number;
    constructor(data: Map<string, any> | null) {
        this._ID = data?.get("matchup_id");
        this._rosterID = data?.get("roster_id");
        this._points = data?.get("points");
    }

    getID(): string {
        return this._ID;
    }

    getRosterID(): string {
        return this._rosterID;
    }

    getPoints(): number {
        return this._points;
    }
}