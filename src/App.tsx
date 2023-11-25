import React, { useCallback, useMemo } from 'react';

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

// Hooks & Web-Api
import {TApiResponse} from "./hooks/usePromise";
import { useLeagueUsers, useNFLState, useRosters, useSleeperLeague } from './hooks';
import { League } from './web-api';

function useDynastyLeague(): [League, boolean, Error, any] {
  const [sleeperLeague, isLoadingSleeperLeague, leagueError, retryLeague]: TApiResponse = useSleeperLeague(League.ID);
  const [leagueUsers, isLoadingUsers, usersError, retryUsers]: TApiResponse = useLeagueUsers(League.ID);
  const [rosters, isLoadingRosters, rostersError, retryRosters]: TApiResponse = useRosters(League.ID);
  const [nflStateResponse, isLoadingNFLState, nflStateError, retryNFLState]: TApiResponse = useNFLState(League.SPORT);

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
  const [league, isLoading, error, retry]: [League, boolean, Error, any] = useDynastyLeague();

  return (
    <div className="App">
      <Header league={league} isLoading={isLoading} />
      <Box sx={{ display: {xs: "none", lg: "block"} }}>
        <Main
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
