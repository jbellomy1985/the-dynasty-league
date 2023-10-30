import usePromise from "./usePromise";
import { LeaguesAPI } from "../web-api";

export default function useSleeperLeague(leagueId: string) {
    return usePromise(() => {
      if(!leagueId) return Promise.resolve(null);
  
      return LeaguesAPI.getById(leagueId);
    }, [leagueId]);
}