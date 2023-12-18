import React from "react";

import { Typography } from "@mui/material";

// Components
import { PasswordValidationType } from "./PasswordValidation";

type PasswordRulesTypes = {
    validations: PasswordValidationType;
}

function PasswordRules({ validations } : PasswordRulesTypes) {
    return (
        <>
            <Typography variant="h5" component="div" sx={{ opacity: 0.4, color: (validations.is8CharLong ? "green" : "red") }}>
                * Must be 8 characters long
            </Typography>
            <Typography variant="h5" component="div" sx={{ opacity: 0.4, color: (validations.containsNumber ? "green" : "red") }}>
                * Contain at least 1 number
            </Typography>
            <Typography variant="h5" component="div" sx={{ opacity: 0.4, color: (validations.containsSpecialCharacter ? "green" : "red") }}>
                * Contain at least 1 special character
            </Typography>
            <Typography variant="h5" component="div" sx={{ opacity: 0.4, color: (validations.containsUpperCase ? "green" : "red") }}>
                * Contain at least 1 uppercase character
            </Typography>
            <Typography variant="h5" component="div" sx={{ opacity: 0.4, color: (validations.containsLowerCase ? "green" : "red") }}>
                * Contain at least 1 lowercase character
            </Typography>
        </>
    )
}

export default React.memo(PasswordRules);