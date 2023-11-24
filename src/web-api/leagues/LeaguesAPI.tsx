import API from "../API";

class LeaguesAPI extends API {
    url = "https://api.sleeper.app/v1/league"

    getById(leagueId: string): Promise<any> {
        return this.get(`${this.url}/${leagueId}`);
    }

    getRosters(leagueId: string): Promise<any> {
        return this.get(`${this.url}/${leagueId}/rosters`);
    }

    getUsers(leagueId: string): Promise<any> {
        return this.get(`${this.url}/${leagueId}/users`);
    }

    getMatchupsByWeek(leagueId: string, week: number): Promise<any> {
        return this.get(`${this.url}/${leagueId}/matchups/${week}`);
    }
}

export default new LeaguesAPI();