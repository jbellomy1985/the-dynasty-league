import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";

class UserAPI {
    getCurrentAuthenticatedUser() {
        return getCurrentUser();
    }

    getAuthenticatedUserAtrributes() {
        return fetchUserAttributes();
    }
}

// eslint-disable-next-line
export default new UserAPI();