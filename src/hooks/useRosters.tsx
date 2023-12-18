import usePromise from "./usePromise";
import { LeaguesAPI } from "../web-api";

export default function useRosters(leagueId: string) {
    return usePromise(() => {
      if(!leagueId) return Promise.resolve(null);
  
      return LeaguesAPI.getRosters(leagueId);
    }, [leagueId]);
}