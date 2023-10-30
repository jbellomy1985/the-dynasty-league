import usePromise from "./usePromise";
import { UsersAPI } from "../web-api";

export default function useLeagueUsers(leagueId: string) {
    return usePromise(() => {
      if(!leagueId) return Promise.resolve(null);
  
      return UsersAPI.getByLeagueId(leagueId);
    }, [leagueId]);
}