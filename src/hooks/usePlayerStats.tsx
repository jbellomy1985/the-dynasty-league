import usePromise from "./usePromise";
import { NFLState, StatsAPI } from "../web-api";
import { Map } from "immutable";

export default function usePlayerStats(nflStateReponse: Map<string, any> | null) {
    return usePromise<Record<number, any>>(async () => {
      if(!nflStateReponse) return Promise.resolve(null);
  
      const nflState = new NFLState(nflStateReponse)
      const playerStats: Record<number, any> = {};
      for (let week: number = 1; week < nflState.getCurrentWeek() + 1; week++) {
        const weeklyStats = await StatsAPI.getStatsByWeek(week, nflState);
        playerStats[week] = weeklyStats;
      }

      return Promise.resolve(playerStats);
    }, [nflStateReponse]);
}