import usePromise from "./usePromise";
import { NFLStateAPI } from "../web-api";

export default function useNFLState(sport: string = "nfl") {
    return usePromise(() => {
      if(!sport) return Promise.resolve(null);
  
      return NFLStateAPI.getBySport(sport);
    }, [sport]);
}