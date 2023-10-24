import API from "../API";

class Leagues extends API {
    url = "https://api.sleeper.app/v1/league"
    constructor() {
        super();
    }

    getById(leagueId: string): Promise<any> {
        return this.get(`${this.url}/${leagueId}`);
    }
}

export default new Leagues();