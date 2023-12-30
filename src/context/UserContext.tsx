import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { AuthUser, FetchUserAttributesOutput, cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { AuthTokens } from "aws-amplify/auth";

import { LoginAPI, UserAPI } from "../web-api";

export type AccountUser = {
    isSignedIn: boolean;
    username: string | null;
    userAttributes: FetchUserAttributesOutput;
}

const defaultUser = {
    isSignedIn: false,
    username: null,
    userAttributes: {}
}

export type UserContextType = {
    user: AccountUser;
    checkIdToken: Function;
    refetchUser: Function;
}

export const UserContext = createContext<UserContextType>({
    user: defaultUser,
    checkIdToken: () => {},
    refetchUser: () => {}
});

type AuthenticatedUserType = {
    authUser: AuthUser;
    userAttributes: FetchUserAttributesOutput;
}

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [refetchUser, setRefetchUser] = useState<Symbol | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<AccountUser>(defaultUser);

    useEffect(() => {
        if(isAuthenticated) {
            UserAPI.getCurrentAuthenticatedUser().then(({authUser, userAttributes}: AuthenticatedUserType) => {
                setUser({
                    isSignedIn: true,
                    username: authUser.username,
                    userAttributes
                });
            }).catch((error: any) => {
                console.log("Unable to get an authenticated user. Please try again later.", error);
                setUser(defaultUser);
            });
        } else {
            setUser(defaultUser);
        }
    }, [isAuthenticated, refetchUser]);

    const handleRefretchUser = useCallback(() => {
        setRefetchUser(Symbol("Refetching User"));
    }, []);

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
    }, []);

    const value = useMemo(() => ({
        user,
        checkIdToken,
        refetchUser: handleRefretchUser
    }), [user, checkIdToken]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}