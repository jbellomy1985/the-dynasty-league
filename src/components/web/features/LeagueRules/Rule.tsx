import React from "react";

// Material UI
import {
    ListItem,
    ListItemText,
} from '@mui/material';

function Rule({text = ""}: {text: string}) {
    return (
        <ListItem>
            <ListItemText>{text}</ListItemText>
        </ListItem>
    );
};

export default React.memo(Rule);