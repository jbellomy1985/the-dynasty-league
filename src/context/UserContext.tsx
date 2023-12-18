import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { AuthUser, cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { AuthTokens } from "aws-amplify/auth";

import { LoginAPI } from "../web-api";

type User = {
    isSignedIn: boolean;
    username: string | null;
}

const defaultUser = {
    isSignedIn: false,
    username: null
}

export type UserContextType = {
    user: User;
    checkIdToken: Function;
}

export const UserContext = createContext<UserContextType>({
    user: defaultUser,
    checkIdToken: () => {}
});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User>(defaultUser);

    useEffect(() => {
        if(isAuthenticated) {
            LoginAPI.getCurrentAuthenticatedUser().then((authUser: AuthUser) => {
                setUser({
                    isSignedIn: true,
                    username: authUser.username
                });
            });
        } else {
            setUser(defaultUser);
        }
    }, [isAuthenticated]);

    const checkIdToken = useCallback(() => {
        cognitoUserPoolsTokenProvider.getTokens().then((authTokens: AuthTokens | null) => {
            const unixTimestamp = authTokens?.idToken?.payload.exp;
            if(!unixTimestamp) {
                setIsAuthenticated(false);
                return;
            }

            const expiredDate = new Date(unixTimestamp * 1000);
            if(expiredDate.getTime() <= Date.now()) {
                setIsAuthenticated(false);
                LoginAPI.handleSignOut();
                return;
            }

            setIsAuthenticated(true);
        });
    }, [cognitoUserPoolsTokenProvider]);

    const value = useMemo(() => ({
        user,
        checkIdToken
    }), [user]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}