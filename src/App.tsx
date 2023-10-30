import React, { useCallback } from 'react';
import { List, Map } from 'immutable';

// Material UI
import { Alert, AlertTitle, Button} from '@mui/material';

// Styles
import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Components
import Header from './components/Header';
import Main from './components/Main';

// Hooks & Web-Api
import {TApiResponse} from "./hooks/usePromise";
import { useLeagueUsers, useNFLState, useRosters, useSleeperLeague } from './hooks';
import { League, NFLState, Roster, User } from './web-api';

function buildUsers(leagueUsers: List<Map<string, any>> | null, rosters: List<Map<string, any>>): User[] {
  const users: User[] = [];

  leagueUsers?.forEach(leagueUser => {
    const rosterData: Map<string, any> | null = rosters?.find(roster => roster.get("owner_id") === leagueUser.get("user_id")) || null;
    const roster = new Roster(rosterData);
    const user = new User(leagueUser, roster);
    users.push(user);
  });

  return users;
}

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
  }, [retryLeague, retryUsers, retryRosters, retryNFLState]);

  const users: User[] = buildUsers(leagueUsers, rosters);
  const nflState = new NFLState(nflStateResponse);

  return [new League(sleeperLeague, users, nflState), isLoading, error, retry];
}

function App() {
  const [league, isLoading, error, retry]: [League, boolean, Error, any] = useDynastyLeague();

  return (
    <div className="App">
      <Header league={league} isLoading={isLoading} />
      <Main
        league={league}
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
    </div>
  );
}

export default React.memo(App);
