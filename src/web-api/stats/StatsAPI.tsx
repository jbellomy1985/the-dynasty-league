/**
 * https://api.sleeper.app/v1/stats/<sport>/<season_type>/<season>/<week>
 */
import API from "../API";
import League from "../leagues/League";
import NFLState from "../nflState/NFLState";

class StatsAPI extends API {
    url = "https://api.sleeper.app/v1/stats"

    getStatsByWeek(week: number, nflState: NFLState): Promise<any> {
        return this.get(`${this.url}/${League.SPORT}/${nflState.getSeasonType()}/${nflState.getSeason()}/${week}`);
    }
}

export default new StatsAPI();