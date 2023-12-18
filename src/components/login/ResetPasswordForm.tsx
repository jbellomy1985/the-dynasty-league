import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";

import { Send as SendIcon} from "@mui/icons-material";
import {
    Typography,
    Box,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button,
    FormHelperText,
    CircularProgress
} from "@mui/material";

import { LoginAPI } from "../../web-api";
import { ResetPasswordOutput } from "aws-amplify/auth";

type ResetPasswordFormType = {
    onNextStep?: Function | null;
    onHaveCode?: Function | null;
    onToastMessage?: Function | null;
    onUsernameUpdate?: Function | null;
}

function ResetPasswordForm({
    onNextStep = null,
    onHaveCode = null,
    onToastMessage = null,
    onUsernameUpdate = null
}: ResetPasswordFormType) {
    const [isReseting, setIsReseting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string>("");

    const handleUsernameChange = useCallback((event:  ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }, []);

    const handleHaveCode = useCallback(() => {
        onHaveCode?.();
    }, [onHaveCode]);

    const handleResetPassword = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setError(null);
        setIsReseting(true);
        LoginAPI.handleResetPassword({ username })
            .then((output: ResetPasswordOutput) => {
                onToastMessage?.("Verification Code sent!");
                onUsernameUpdate?.(username);
                const { nextStep: { resetPasswordStep } } = output;
                if(resetPasswordStep) {
                    onNextStep?.(resetPasswordStep);
                }
            })
            .catch((error: any) => {
                setError(error.message);
            }).finally(() => {
                setIsReseting(false);
            });
    }, [username]);

    return (
        <>
            <Typography variant="h3" component="div">
                Reset Password
            </Typography>
            <Typography variant="h5" component="div" sx={{ opacity: 0.4 }}>
                Please enter your username to request a verification code
            </Typography>
            <Button
                variant="text"
                onClick={handleHaveCode}
                sx={{ marginBottom: 10 }}
            >
                Already have a code?
            </Button>
            <Box paddingRight={20}>
                <form onSubmit={handleResetPassword}>
                    <FormControl
                        fullWidth
                        required
                        variant="outlined"
                        error={Boolean(error)}
                        sx={{ marginBottom: 4, backgroundColor: "white" }}
                    >
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <OutlinedInput
                            id="username"
                            disabled={isReseting}
                            value={username}
                            onChange={handleUsernameChange} />
                        {error && <FormHelperText sx={{ margin: 0, padding: "0 14px", backgroundColor: "#e6e6e6" }} id="username-helper-text">{error}</FormHelperText>}
                    </FormControl>
                    <Button sx={{ width: "110px", height: "37px" }} disabled={!username || isReseting} type="submit" variant="contained" endIcon={<SendIcon />}>
                        {isReseting ? <CircularProgress size={25} /> : "Request"}
                    </Button>
                </form>
            </Box>
        </>
    );
}

export default React.memo(ResetPasswordForm);