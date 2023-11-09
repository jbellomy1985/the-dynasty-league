import React, { useMemo } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

import { League, Player, User } from "../../../web-api";

// Material UI
import { Grid, Typography } from '@mui/material';

type TCompare = {
    league?: League | null;
}

type TChartData = {
    owner: string;
    avgAge: string;
    fill: string;
}

const userColor: string[] = ["#FF8B00", "#D1C100", "#6CFF00", "#0042FF", "#FF00F3", "#FF0000", "#000000", "#00FFEC", "#FF0068", "#6F6F6F"];

function buildChartData(league: League | null): TChartData[] | undefined {
    return league?.getUsers()?.map((user: User, index: number) => {
        let avgAge: number = 0;
        const players: Player[] | undefined = user.getRoster()?.getPlayers();
        const numPLayers = players?.length || 1;

        players?.forEach((player: Player) => { avgAge += player.getAge()});

        return {
            owner: user.getTeamName(),
            avgAge: (avgAge / numPLayers).toFixed(2),
            fill: userColor[index]
        }
    });
}

function CompareTeams({ league = null }: TCompare) {
    const data: TChartData[] | undefined = useMemo(() => buildChartData(league), [league]);

    return (
        <>
            <Typography variant="h3" component="div" gutterBottom>
                Average Age Team
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <ResponsiveContainer width="100%" height={600}>
                        <BarChart layout="vertical" data={data} margin={{ left: 50}}>
                            <CartesianGrid />
                            <XAxis type="number" />
                            <YAxis dataKey="owner" type="category" />
                            <Tooltip />
                            <Bar dataKey="avgAge" barSize={40}>
                                {
                                    data?.map((entry: TChartData) => (
                                        <Cell key={entry.owner} fill={entry.fill} />
                                    ))
                                }
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Grid>
                <Grid item>
                    
                </Grid>
            </Grid>
        </>
    );
};

export default React.memo(CompareTeams);