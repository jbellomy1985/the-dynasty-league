import React from "react";

// Material UI
import {
    Box,
    Grid,
    IconButton,
    List,
    Stack,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Tabs,
    Typography
} from '@mui/material';

import EmailIcon from '@mui/icons-material/Email';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Rule from "./Rule";
import SubRules from "./SubRules";

enum LeagueTabs {
    SETUP,
    OFF_SEASON,
    REGULAR_SEASON,
    PLAYOFFS
};

type TabPanelProps = {
    children?: React.ReactNode;
    show: boolean;
}

function TabPanel(props: TabPanelProps) {
    const { show, children } = props;
    return (
        <div
            role="tabpanel"
            hidden={!show}
        >
            <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
            </Box>
        </div>
    )
}

function LeagueRules() {
    const [selectedTab, setSelectedTab] = React.useState<LeagueTabs>(LeagueTabs.SETUP);

    const handleChange = (event: React.SyntheticEvent, newValue: LeagueTabs) => {
        setSelectedTab(newValue);
    };

    return (
        <Grid container direction="column" sx={{width: "100%"}}>
            <Grid item xs={12} sx={{textAlign: "center"}}>
                <Typography variant="h2">The Dynasty League Rules & Setup</Typography>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item>
                    <Stack direction="row" spacing={6}>
                        <EmailIcon color="primary" sx={{padding: "8px 0"}} /> <Typography sx={{marginLeft: "8px !important", padding: "8px 0"}}>2023.dynasty.league@gmail.com</Typography>
                        <IconButton
                            color="secondary"
                            href="https://venmo.com/u/dynasty-league-2023"
                            target="_blank">
                            <AccountBalanceIcon />
                        </IconButton>
                    </Stack>
                </Grid>
            </Grid>
            <Grid item>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={selectedTab} onChange={handleChange} aria-label="Rules Tabs">
                            <Tab label="Set-Up" value={LeagueTabs.SETUP} />
                            <Tab label="Off-Season" value={LeagueTabs.OFF_SEASON} />
                            <Tab label="Regular Season" value={LeagueTabs.REGULAR_SEASON} />
                            <Tab label="Playoffs" value={LeagueTabs.PLAYOFFS} />
                        </Tabs>
                    </Box>
                    <TabPanel show={selectedTab === LeagueTabs.SETUP}>
                        <List>
                            <Rule text="1) $25 buy-in fee, plus a $25 deposit for a spot next year" />
                            <Rule text="2) IDP league with individual Defensive Players" />
                            <SubRules>
                                <Rule text="a) For scoring, check the App to see how the scoring is broken down" />
                            </SubRules>
                            <Rule text="3) The first draft will be a start-up randomized snake draft of 22 rounds, consisting of all players" />
                            <SubRules>
                                <Rule text="a) For the initial draft, their draft position may be traded between 2 players. Both players must contact a commissioner and inform them of the intent to trade draft positions" />
                            </SubRules>
                            <Rule text="4) Rookie Draft picks and FAAB may be traded, and up to 3 years' worth of draft picks can be traded; however, for each additional year after the following year, you need to pay the deposit for each year's draft picks" />
                            <SubRules>
                                <Rule text="a) For example: It is 2023, and you trade 2024, 2025, and 2026 draft picks. You must pay $25 for 2025 and $25 for 2026. Those league dues will go towards the deposit for those years, no matter who the owner of the team is at that time" />
                            </SubRules>
                            <Rule text="5) Free agents on waiver may be acquired during the year using FAAB (Free Agent Acquisition Budget)" />
                            <SubRules>
                                <Rule text="a) Budget will be $250 for the year" />
                            </SubRules>
                            <Rule text="6) 3 IR slots can be used for players who are on IR, out because of COVID, out for the game, not active, or are DNR/Holdout players" />
                            <SubRules>
                                <Rule text="a) Players who are Suspended or Doubtful to play cannot be put on IR. Doubtful players elevated to Out can be moved to IR once their designation is update to Out" />
                            </SubRules>
                            <Rule text="7) There will be 2 divisions, and the winner from each division will get 1st and 2nd place seeding in the playoffs and earn a bye" />
                            <SubRules>
                                <Rule text="a) Divisions will be randomized each season" />
                            </SubRules>
                        </List>
                    </TabPanel>
                    <TabPanel show={selectedTab === LeagueTabs.OFF_SEASON}>
                        <List>
                            <Rule text="1) Rosters will be locked at the end of the Championship game" />
                            <Rule text="2) Each team will designate their keepers (all other players will be dropped by the commissioners) 1 month before the Rookie Draft. The commissioner will send a file to each team with their players, values, and a box to designate up to 13 players to keep at the beginning of August" />
                            <SubRules>
                                <Rule text="a) Must keep a minimum of 3 defensive players and up to 13 players total (10 max offensive players, 3 min defensive players)" />
                            </SubRules>
                            <Rule text="3) 1 week after keepers are declared, and all other players dropped, the commissioner will set each team's FAAB budget to $275 - [team total value]. This way, teams who kept better players will have less FAAB for FA acquisitions" />
                            <SubRules>
                                <Rule text="a) Teams may acquire FA using the new FAAB balance. You may lose out on draft picks if you acquire more than 13 players before the rookie draft. You'll want to manage your team in a way to make sure you maximize your value" />
                            </SubRules>
                            <Rule text="4) There will be a linear rookie draft the week before the start of the NFL season to fill up the team (9 rounds). Teams may trade to try and fill up active roster spots or unload draft picks they cannot make due to roster size" />
                            <Rule text="5) Finally, all teams may acquire remaining players (undrafted rookies & free agents) after the draft" />
                        </List>
                    </TabPanel>
                    <TabPanel show={selectedTab === LeagueTabs.REGULAR_SEASON}>
                        <List>
                            <Rule text="1) The regular season will consist of 13 weeks" />
                            <Rule text="2) The highest scorer in each week will earn $5" />
                            <SubRules>
                                <Rule text="a) If 2 or more teams tie for the highest score, the pot will go towards next week, and the winner will get double (for example, $10)" />
                            </SubRules>
                        </List>
                    </TabPanel>
                    <TabPanel show={selectedTab === LeagueTabs.PLAYOFFS}>
                        <List>
                            <Rule text="1) 6 teams will comprise the Championship Playoff bracket" />
                            <SubRules>
                                <Rule text="a) The place each team receives in the championship bracket will determine that team's draft postion for the next year" />
                            </SubRules>
                            <Rule text="2) The winner from each divison will get 1st and 2nd place, and have a bye the first week" />
                            <Rule text="3) Each round will be one week, with the Championship spanning 2 weeks" />
                            <SubRules>
                                <Rule text="a) The lowest team will automatically be re-seeded in the bracket to always face the highest seeded team" />
                                <Table sx={{ width: "max-content" }}>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ border: "none" }}>Quarterfinals:</TableCell>
                                            <TableCell sx={{ border: "none" }}>3 vs. 6, 4 vs. 5, 1 & 2 - bye, duration = 1 week</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ border: "none" }}>Semi-finals:</TableCell>
                                            <TableCell sx={{ border: "none" }}>TBD vs. TBD, TBD vs. TBD, duration = 1 week</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ border: "none" }}>Final:</TableCell>
                                            <TableCell sx={{ border: "none" }}>TBD vs. TBD, duration = 2 weeks</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </SubRules>
                            <Rule text="4) The remaining 4 teams will go into a consolation bracket" />
                            <SubRules>
                                <Rule text="a) Consolation bracket will not be used to determine draft position. Each team in the consolation brakcet will be seeded before the rookie draft to their final position at the end of the regular season (week 13)" />
                            </SubRules>
                        </List>
                    </TabPanel>
                </Box>
            </Grid>
        </Grid>
    );
};

export default React.memo(LeagueRules);