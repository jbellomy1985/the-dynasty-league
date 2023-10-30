import usePromise from "./usePromise";
import { RostersAPI } from "../web-api";

export default function useRosters(leagueId: string) {
    return usePromise(() => {
      if(!leagueId) return Promise.resolve(null);
  
      return RostersAPI.getByLeagueId(leagueId);
    }, [leagueId]);
}