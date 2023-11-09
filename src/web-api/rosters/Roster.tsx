import { Map } from "immutable";
import Player, { TPlayer } from "../players/Player";

import playersData from "../players/data/players.json";
import Stats from "../stats/Stats";

type TPlayers = Record<string, any>;

export default class Roster {
    _ownerId: string;
    _ID: string;
    _wins: number;
    _losses: number;
    _fptsFor: number;
    _fptsAgainst: number;
    _players: Player[] = [];
    constructor(data: Map<string, any> | undefined, stats: Record<number, any>, currentWeek: number) {
        this._ownerId = data?.get("owner_id");
        this._ID = data?.get("roster_id");

        const settings = data?.get("settings");
        this._wins = Number(settings.get("wins"));
        this._losses = Number(settings.get("losses"));
        this._fptsFor = Number(`${settings.get("fpts")}.${settings.get("fpts_decimal")}`);
        this._fptsAgainst = Number(`${settings.get("fpts_against")}.${settings.get("fpts_against_decimal")}`);
        
        const playersArray: string[] = data?.get("players");
        const players: TPlayers = playersData;

        playersArray.forEach((playerId: string) => {
            const player: TPlayer = players[playerId];
            let playerStats: Record<number, Stats> = {};
            for (let week: number = 1; week < currentWeek + 1; week++) {
                playerStats[week] = new Stats(stats[week].get(playerId));
            }
            this._players.push(new Player(player, playerStats));
        });
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

    getPlayers(): Player[] {
        return this._players;
    }
}
