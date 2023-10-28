import React from 'react';

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
import usePromise, {TApiResponse} from "./hooks/usePromise";
import {League, LeaguesAPI} from './web-api';

function useSleeperLeague(leagueId: string) {
  return usePromise(() => {
    if(!leagueId) return Promise.resolve(null);

    return LeaguesAPI.getById(leagueId);
  }, [leagueId]);
}

function App() {
  const [sleeperLeague, isLoading, error, retry]: TApiResponse = useSleeperLeague(League.ID);
  const league = new League(sleeperLeague);

  return (
    <div className="App">
      <Header league={league} isLoading={isLoading} />
      <Main
        leagueError={error &&
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={retry}>
                Retry
              </Button>
            }
          >
            <AlertTitle>We encourted an issue while loading the League</AlertTitle>
            {error.message}
          </Alert>
        }
      />
    </div>
  );
}

export default React.memo(App);
