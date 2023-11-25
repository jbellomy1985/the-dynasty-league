import React, { Children } from "react";

// Material UI
import {
    List
} from '@mui/material';

function SubRules({children = null}: {children: any}) {
    return (
        <List sx={{padding: "0 64px"}}>
            {children}
        </List>
    );
};

export default React.memo(SubRules);