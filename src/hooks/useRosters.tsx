import { List, Map } from "immutable";

import usePromise from "./usePromise";

import { LeaguesAPI } from "../web-api";

export default function useRosters(leagueId: string) {
    return usePromise<List<Map<string, any>>>(() => {
      if(!leagueId) return Promise.resolve(null);
  
      return LeaguesAPI.getRosters(leagueId);
    }, [leagueId]);
}