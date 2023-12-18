import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Amplify } from 'aws-amplify';

import { CookieStorage, Hub } from "aws-amplify/utils";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";

// Material UI
import { Alert, AlertTitle, Box, Button, Snackbar} from '@mui/material';

// Styles
import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Components
import Header from './components/Header';
import Main from './components/web/Main';
import Mobile from './components/mobile/Mobile';

// Utils
import Navigation from './utils/Navigation';

// Context
import useUser from './context/useUser';

// Hooks & Web-Api
import {ApiResponseType} from "./hooks/usePromise";
import { useLeagueUsers, useNFLState, useRosters, useSleeperLeague } from './hooks';
import { League } from './web-api';

const userPoolId: string | undefined = process.env.REACT_APP_USER_POOL_ID;
const userPoolClientId: string | undefined = process.env.REACT_APP_USER_POOL_CLIENT_ID;
const oauthDomain: string | undefined = process.env.REACT_APP_OAUTH_DOMAIN;

if(typeof userPoolId === 'undefined' || typeof userPoolClientId === 'undefined' || typeof oauthDomain === 'undefined') {
  throw new Error("Something is not set up right. Please contact the admin to look into the issue");
}

Amplify.configure({
  Auth: {
      Cognito: {
          userPoolId,
          userPoolClientId,
          signUpVerificationMethod: 'code',
          loginWith: {
              oauth: {
                  domain: oauthDomain,
                  scopes: [
                    'openid',
                    'email',
                    'aws.cognito.signin.user.admin'
                  ],
                  redirectSignIn: ["https://jbellomy1985.github.io/the-dynasty-league"],
                  redirectSignOut: ["https://jbellomy1985.github.io/the-dynasty-league"],
                  responseType: 'code'
              }
          }
      }
  }
});

cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());

function useDynastyLeague(): [League, boolean, Error, any] {
  const [sleeperLeague, isLoadingSleeperLeague, leagueError, retryLeague]: ApiResponseType = useSleeperLeague(League.ID);
  const [leagueUsers, isLoadingUsers, usersError, retryUsers]: ApiResponseType = useLeagueUsers(League.ID);
  const [rosters, isLoadingRosters, rostersError, retryRosters]: ApiResponseType = useRosters(League.ID);
  const [nflStateResponse, isLoadingNFLState, nflStateError, retryNFLState]: ApiResponseType = useNFLState(League.SPORT);

  const isLoading = isLoadingSleeperLeague || isLoadingUsers || isLoadingRosters || isLoadingNFLState;
  const error = leagueError || usersError || rostersError || nflStateError;

  const retry = useCallback(() => {
    if(leagueError) retryLeague();
    if(usersError) retryUsers();
    if(rostersError) retryRosters();
    if(nflStateError) retryNFLState();
  }, [leagueError, retryLeague, usersError, retryUsers, rostersError, retryRosters, nflStateError, retryNFLState]);

  const league = useMemo(
    () =>
      new League(sleeperLeague, leagueUsers, rosters, nflStateResponse),
    [sleeperLeague, leagueUsers, rosters, nflStateResponse]
  );

  return [league, isLoading, error, retry];
}

function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [navigation, setNavigation] = useState<Navigation>(Navigation.DASHBOARD);

  const { checkIdToken } = useUser();

  const [league, isLoading, error, retry]: [League, boolean, Error, any] = useDynastyLeague();

  const handleSignin = useCallback(() => {
    setNavigation(Navigation.SIGNIN);
  }, []);

  const handleHideToast = useCallback(() => setToastMessage(null), []);

  useEffect(() => {
    checkIdToken();
    const hubListenerCancelToken = Hub.listen('auth', ({ payload: { event } }) => {
      checkIdToken();
      switch (event) {
        case 'signedIn':
          setToastMessage("Sucessfully signed in!");
          setNavigation(Navigation.DASHBOARD);
          break;
        case 'signedOut':
          setToastMessage("Successfully logged out!");
          if(navigation === Navigation.TEAM) setNavigation(Navigation.DASHBOARD);
          break;
      }
    });

    window.addEventListener('beforeunload', hubListenerCancelToken);

    return () => {
      window.removeEventListener('beforeunload', hubListenerCancelToken);
    }
  }, []);

  return (
    <div className="App">
      <Snackbar
          open={Boolean(toastMessage)}
          autoHideDuration={5000}
          onClose={handleHideToast}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <Alert severity="success" sx={{width: "100%"}} onClose={handleHideToast}>
              {toastMessage}
          </Alert>
      </Snackbar>
      <Header league={league} isLoading={isLoading} onSigninClick={handleSignin} />
      <Box sx={{ display: {xs: "none", lg: "block"} }}>
        <Main
          league={league}
          navigation={navigation}
          onNavigationChange={setNavigation}
          isLoading={isLoading}
          leagueError={error &&
            <Alert
              severity="error"
              action={
                <Button color="inherit" size="small" onClick={retry}>
                  Retry
                </Button>
              }
            >
              <AlertTitle>We encourted an issue while loading the League. Please try again, or come back later.</AlertTitle>
              {error.message}
            </Alert>
          }
        />
      </Box>
      <Box sx={{ display: {xs: "block", lg: "none"} }}>
        <Mobile
          league={league}
          isLoading={isLoading}
          leagueError={error &&
            <Alert
              severity="error"
              action={
                <Button color="inherit" size="small" onClick={retry}>
                  Retry
                </Button>
              }
            >
              <AlertTitle>We encourted an issue while loading the League. Please try again, or come back later.</AlertTitle>
              {error.message}
            </Alert>
          }
        />
      </Box>
    </div>
  );
}

export default React.memo(App);
