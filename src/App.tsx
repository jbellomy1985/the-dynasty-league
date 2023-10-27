import React from 'react';

// Material UI
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

// Styles
import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Components
import Header from './components/Header';
import usePromise, {TApiResponse} from "./hooks/usePromise";
import {League, LeaguesAPI} from './web-api';

function useSleeperLeague(leagueId: string) {
  return usePromise(() => {
    if(!leagueId) return Promise.resolve(null);

    return LeaguesAPI.getById(leagueId);
  }, [leagueId]);
}

function App() {
  const [sleeperLeague, isLoading, error, retry]: TApiResponse = useSleeperLeague("995785140678815744");
  const league = new League(sleeperLeague);

  // TODO: Build an error page for a better look and feel
  return (
    <div className="App">
      <Header league={league} />
      <div className={isLoading ? "App__loading" : "App__body"}>
        {
          isLoading &&
          <CircularProgress size="16rem" />
        }
        {
          error &&
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={retry}>
                Retry
              </Button>
            }>{error.message}</Alert>
        }
        {
          !isLoading && !error &&
          <p>Display Component here</p>
        }
      </div>
    </div>
  );
}

export default React.memo(App);
