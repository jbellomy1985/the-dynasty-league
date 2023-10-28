import API from "../API";

class NFLStateAPI extends API {
    url = "https://api.sleeper.app/v1/state"

    getBySport(sport: string): Promise<any> {
        return this.get(`${this.url}/${sport}`);
    }
}

export default new NFLStateAPI();