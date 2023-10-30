import API from "../API";

class UsersAPI extends API {
    url = "https://api.sleeper.app/v1/league"

    getByLeagueId(leagueId: string): Promise<any> {
        return this.get(`${this.url}/${leagueId}/users`);
    }
}

export default new UsersAPI();