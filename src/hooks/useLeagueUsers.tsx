import { List, Map } from "immutable";

import usePromise from "./usePromise";

import { LeaguesAPI } from "../web-api";

export default function useLeagueUsers(leagueId: string) {
    return usePromise<List<Map<string, any>>>(() => {
      if(!leagueId) return Promise.resolve(null);
  
      return LeaguesAPI.getUsers(leagueId);
    }, [leagueId]);
}