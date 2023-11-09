import React, { ReactElement, useState } from 'react';

// Material UI
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

// Components
import MyTeam from './features/MyTeam';
import Payouts from './features/Payouts';
import CompareTeams from './features/CompareTeams';
import History from './features/History';

// Web-Api
import { League } from '../../web-api';

const headerHeight: number = 64;

enum Navigation {
    DASHBOARD,
    TEAM,
    COMPARE,
    PAYOUTS,
    HISTORY
};

type TMain = {
    league?: League | null;
    isLoading: boolean,
    leagueError?: ReactElement<any, any> | null;
}

function Main({ league = null, isLoading = false, leagueError = null }: TMain) {
  const [navigation, setNavigation] = useState<Navigation>(Navigation.DASHBOARD);

  return (
    <Box sx={{ display: 'flex', marginTop: `${headerHeight}px` }}>
        <Box
            aria-label="main-content"
            component="main"
            sx={{ flexGrow: 1, p: 3, marginBottom: 5 }}
        >
            {leagueError}
            {
                navigation === Navigation.DASHBOARD &&
                <>
                    Main Content goes here (Maybe League news, or something of that nature... Almost like a dashboard)
                </>
            }
            {
                navigation === Navigation.TEAM &&
                <MyTeam league={league} />
            }
            {
                navigation === Navigation.COMPARE &&
                <CompareTeams league={league} />
            }
            {
                navigation === Navigation.PAYOUTS &&
                <Payouts league={league} />
            }
            {
                navigation === Navigation.HISTORY &&
                <History league={league} />
            }
        </Box>
        <Paper
            aria-label="mobile-navigation"
            component="nav"
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0
            }}
            elevation={3}
        >
            <BottomNavigation value={navigation} onChange={(event, newValue) => setNavigation(newValue)} showLabels>
                <BottomNavigationAction label="Dashboard" icon={<HomeIcon />} value={Navigation.DASHBOARD} />
                <BottomNavigationAction label="My Team" icon={<GroupsIcon />} value={Navigation.TEAM} />
                <BottomNavigationAction label="Compare Teams" icon={<CompareArrowsOutlinedIcon />} value={Navigation.COMPARE} />
                <BottomNavigationAction label="Payouts" icon={<LocalAtmOutlinedIcon />} value={Navigation.PAYOUTS} />
                <BottomNavigationAction label="History" icon={<HistoryOutlinedIcon />} value={Navigation.HISTORY} />
            </BottomNavigation>
        </Paper>
    </Box>
  );
}

export default React.memo(Main);
