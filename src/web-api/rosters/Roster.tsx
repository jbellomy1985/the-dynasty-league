import { List, Map } from "immutable";

export default class Roster {
    _ownerId: string;
    _ID: string;
    _wins: number;
    _losses: number;
    _fptsFor: number;
    _fptsAgainst: number;
    _players: List<string>;
    constructor(data: Map<string, any>) {
        const settings = data?.get("settings");
        this._ownerId = data?.get("owner_id");
        this._ID = data?.get("roster_id");
        this._wins = Number(settings.get("wins"));
        this._losses = Number(settings.get("losses"));
        this._fptsFor = Number(`${settings.get("fpts")}.${settings.get("fpts_decimal")}`);
        this._fptsAgainst = Number(`${settings.get("fpts_against")}.${settings.get("fpts_against_decimal")}`);
        this._players = data?.get("players");
    }

    getOwnerId(): string {
        return this._ownerId;
    }

    getID(): string {
        return this._ID;
    }

    getFantasyPointsFor(): number {
        return this._fptsFor;
    }

    getFantasyPointsAgainst(): number {
        return this._fptsAgainst;
    }

    getPlayers(): List<string> {
        return this._players;
    }
}
