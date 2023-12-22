import { Map } from "immutable";

import usePromise from "./usePromise";

import { NFLStateAPI } from "../web-api";

export default function useNFLState(sport: string = "nfl") {
    return usePromise<Map<string, any>>(() => {
      if(!sport) return Promise.resolve(null);
  
      return NFLStateAPI.getBySport(sport);
    }, [sport]);
}