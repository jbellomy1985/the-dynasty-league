import API from "../API";
import {fromJS} from "immutable";

class LeaguesAPI extends API {
    url = "https://api.sleeper.app/v1/league"
    constructor() {
        super();
    }

    getById(leagueId: string): Promise<any> {
        return this.get(`${this.url}/${leagueId}`);
    }
}

export default new LeaguesAPI();