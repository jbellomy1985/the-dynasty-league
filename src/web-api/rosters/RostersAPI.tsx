import API from "../API";

class RostersAPI extends API {
    url = "https://api.sleeper.app/v1/league"

    getByLeagueId(leagueId: string): Promise<any> {
        return this.get(`${this.url}/${leagueId}/rosters`);
    }
}

export default new RostersAPI();