import { AuthUser, fetchUserAttributes, getCurrentUser, updateUserAttributes } from "aws-amplify/auth";

class UserAPI {
    getCurrentAuthenticatedUser() {
        return getCurrentUser().then(async (authUser: AuthUser) => {
            const userAttributes = await fetchUserAttributes();
            return {
                authUser,
                userAttributes
            }
        });
    }

    updateUserAttributes(userAttributes: Record<string, any>) {
        return updateUserAttributes({ userAttributes });
    }
}

// eslint-disable-next-line
export default new UserAPI();