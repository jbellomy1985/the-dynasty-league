import usePromise from "./usePromise";
import { NFLState, LeaguesAPI, League } from "../web-api";
import { Map } from "immutable";

export default function useMatchups(nflStateReponse: Map<string, any> | null) {
    return usePromise<Record<number, any>>(async () => {
      if(!nflStateReponse) return Promise.resolve(null);
  
      const nflState = new NFLState(nflStateReponse)
      const matchups: Record<number, any> = {};
      for (let week: number = 1; week < nflState.getCurrentWeek() + 1; week++) {
        const weeklyMatchups = await LeaguesAPI.getMatchupsByWeek(League.ID, week);
        matchups[week] = weeklyMatchups;
      }

      return Promise.resolve(matchups);
    }, [nflStateReponse]);
}