import React, { ReactElement } from 'react';

// Material UI
import { Box } from '@mui/material';

// Components
import MenuDrawer from './MenuDrawer';
import MyTeam from './features/MyTeam';
import LeagueRules from "./features/LeagueRules/LeagueRules";
import Payouts from './features/Payouts';
import CompareTeams from './features/CompareTeams';
import History from './features/History';
import Login from '../login/Login';
import MyAccount from '../login/MyAccount';

// Utils
import Navigation from '../../utils/Navigation';

// Web-Api
import { League } from '../../web-api';
import Dashboard from './features/Dashboard';
import useUser from '../../context/useUser';

const drawerWidth: number = 300;
const headerHeight: number = 64;

type MainType = {
    league: League;
    navigation: Navigation;
    onNavigationChange: Function;
    isLoading?: boolean,
    leagueError?: ReactElement<any, any> | null;
}

function Main({ league, navigation, onNavigationChange, isLoading = false, leagueError = null}: MainType) {

    const { user } = useUser();

    return (
        <Box sx={{ display: 'flex', marginTop: `${headerHeight}px` }}>
            <Box
                component="nav"
                sx={{ width: { lg: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="league-navigation"
            >
                <MenuDrawer drawerWidth={drawerWidth} headerHeight={headerHeight} onNavigationChange={onNavigationChange} />
            </Box>
            <Box
                aria-label="main-content"
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
            >
                {leagueError}
                {
                    navigation === Navigation.SIGNIN &&
                    <Login avatarLink={league.getAvatarLink()} />
                }
                {
                    navigation === Navigation.ACCOUNT && user.isSignedIn &&
                    <MyAccount />
                }
                {
                    navigation === Navigation.DASHBOARD &&
                    <Dashboard />
                }
                {
                    navigation === Navigation.RULES &&
                    <LeagueRules />
                }
                {
                    navigation === Navigation.TEAM && user.isSignedIn &&
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
        </Box>
    );
}

export default React.memo(Main);
