import { List, Map } from "immutable";

export default class NFLState {
    _week: string;
    constructor(data: Map<string, any>) {
        this._week = data?.get("owner_id");
    }

    getCurrentWeek(): string {
        return this._week;
    }
}
