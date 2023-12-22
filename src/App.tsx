import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Amplify } from 'aws-amplify';

import { CookieStorage, Hub } from "aws-amplify/utils";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";

// Material UI
import { Alert, AlertTitle, Box, Button} from '@mui/material';

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
import { useLeagueUsers, useNFLState, useRosters, useSleeperLeague } from './hooks';
import { League } from './web-api';
import AmplifyConfigFactory, { AWSResponseType, VerificationMethod } from './config/AmplifyConfigFactory';
import useSnackbar from './context/useSnackbar';
import { Severity } from './context/SnackbarContext';

const userPoolId: string | undefined = process.env.REACT_APP_USER_POOL_ID;
const userPoolClientId: string | undefined = process.env.REACT_APP_USER_POOL_CLIENT_ID;
const oauthDomain: string | undefined = process.env.REACT_APP_OAUTH_DOMAIN;

if(typeof userPoolId === 'undefined' || typeof userPoolClientId === 'undefined' || typeof oauthDomain === 'undefined') {
  throw new Error("Something is not set up right. Please contact the admin to look into the issue");
}

Amplify.configure(
  AmplifyConfigFactory
    .withUserPoolId(userPoolId)
    .withUserPoolClientId(userPoolClientId)
    .withSignUpVerificationMethod(VerificationMethod.code)
    .withDomain(oauthDomain)
    .withScopes(['openid', 'email', 'aws.cognito.signin.user.admin'])
    .withResponseType(AWSResponseType.code)
    .getConfig()
);

cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());

function useDynastyLeague(): [League, boolean, Error | null, any] {
  const [sleeperLeague, isLoadingSleeperLeague, leagueError, retryLeague] = useSleeperLeague(League.ID);
  const [leagueUsers, isLoadingUsers, usersError, retryUsers] = useLeagueUsers(League.ID);
  const [rosters, isLoadingRosters, rostersError, retryRosters] = useRosters(League.ID);
  const [nflStateResponse, isLoadingNFLState, nflStateError, retryNFLState] = useNFLState(League.SPORT);

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
  const [navigation, setNavigation] = useState<Navigation>(Navigation.DASHBOARD);

  const { checkIdToken } = useUser();
  const { createToast } = useSnackbar();

  const [league, isLoading, error, retry]: [League, boolean, Error | null, any] = useDynastyLeague();

  const handleSignin = useCallback(() => {
    setNavigation(Navigation.SIGNIN);
  }, []);

  const handleMyAccount = useCallback(() => {
    setNavigation(Navigation.ACCOUNT);
  }, []);

  useEffect(() => {
    checkIdToken();
    const hubListenerCancelToken = Hub.listen('auth', ({ payload: { event } }) => {
      checkIdToken();
      switch (event) {
        case 'signedIn':
          createToast("Sucessfully signed in!", Severity.SUCCESS);
          setNavigation(Navigation.DASHBOARD);
          break;
        case 'signedOut':
          createToast("Successfully logged out!", Severity.SUCCESS);
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
      <Header
        league={league}
        isLoading={isLoading}
        onMyAccountClick={handleMyAccount}
        onSigninClick={handleSignin}
      />
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
