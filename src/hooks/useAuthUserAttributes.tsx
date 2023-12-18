import { UserAPI } from "../web-api";

import usePromise from "./usePromise";

export default function useAuthUserAttributes() {
    return usePromise(() => UserAPI.getAuthenticatedUserAtrributes(), []);
}