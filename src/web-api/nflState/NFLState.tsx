import { Map } from "immutable";

export default class NFLState {
    _week: number;
    _seasonType: string;
    _season: string;
    constructor(data: Map<string, any> | null) {
        this._week = data?.get("week");
        this._seasonType = data?.get("season_type");
        this._season = data?.get("season");
    }

    getCurrentWeek(): number {
        return this._week;
    }

    getSeasonType(): string {
        return this._seasonType;
    }

    getSeason(): string {
        return this._season;
    }
}
