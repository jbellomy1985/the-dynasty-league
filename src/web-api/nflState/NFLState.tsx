import { List, Map } from "immutable";

export default class NFLState {
    _week: string;
    constructor(data: Map<string, any> | null) {
        this._week = data?.get("display_week");
    }

    getCurrentWeek(): string {
        return this._week;
    }
}
