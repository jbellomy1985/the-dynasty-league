import React from "react";

// Material UI
import {
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material';

function History() {
    return (
        <>
            <Typography variant="h3" component="div">
                Items to be added
            </Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemText primary="League History" secondary="Average Placement by User" />
                </ListItem>
            </List>
        </>
    );
};

export default React.memo(History);