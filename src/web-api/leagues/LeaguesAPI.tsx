import API from "../API";

class LeaguesAPI extends API {
    url = "https://api.sleeper.app/v1/league"

    getById(leagueId: string): Promise<any> {
        return this.get(`${this.url}/${leagueId}`);
    }
}

export default new LeaguesAPI();