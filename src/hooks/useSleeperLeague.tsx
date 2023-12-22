import { Map } from "immutable";

import usePromise from "./usePromise";

import { LeaguesAPI } from "../web-api";

export default function useSleeperLeague(leagueId: string) {
    return usePromise<Map<string, any>>(() => {
      if(!leagueId) return Promise.resolve(null);
  
      return LeaguesAPI.getById(leagueId);
    }, [leagueId]);
}