import React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

// Styles
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Components
import Header from './components/header';
import usePromise, {TApiResponse} from "./hooks/usePromise";
import {Leagues} from './web-api';

function useSleeperLeague(leagueId: string) {
  return usePromise(() => {
    if(!leagueId) return Promise.resolve(null);

    return Leagues.getById(leagueId);
  }, [leagueId]);
}

function App() {
  const [sleeperLeague, isLoading, error, retry]: TApiResponse = useSleeperLeague("995785140678815744");

  return (
    <div className="App">
      <Header />
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
