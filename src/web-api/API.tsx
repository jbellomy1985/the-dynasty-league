import axios from "axios";
import {fromJS} from "immutable";

export default class API {
    get(url: string): Promise<any> {
        return axios.get(url)
            .then(response => {
                return fromJS(response.data);
            });
    }
}