import React, { useCallback, useState } from "react";

import { Avatar, Box, Card, Grid } from "@mui/material";

// Components
import LoginForm from "./LoginForm";
import ResetPasswordForm from "./ResetPasswordForm";
import ConfirmSignIn from "./ConfirmSignIn";
import ConfirmResetPassword from "./ConfirmResetPassword";

enum LoginStep {
    LOGIN,
    CONFIRM_SIGNIN,
    RESET_PASSWORD,
    CONFIRM_RESET_PASSWORD
}

function getNextStep(nextStep: string | null) {
    switch(nextStep) {
        case "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED":
            return LoginStep.CONFIRM_SIGNIN;
        case "RESET_PASSWORD":
            return LoginStep.RESET_PASSWORD;
        case "CONFIRM_RESET_PASSWORD_WITH_CODE":
                return LoginStep.CONFIRM_RESET_PASSWORD;
        default:
            // @ToDo: Should we handle this different??
            return LoginStep.LOGIN;
    }
}

type LoginType = {
    avatarLink: string;
}

function Login({ avatarLink }: LoginType) {
    const [resetPasswordUsername, setResetPasswordUsername] = useState<string | null>(null);
    const [loginStep, setLoginStep] = useState<LoginStep>(LoginStep.LOGIN);

    const handleNextStep = useCallback((nextStep: string) => {
        setLoginStep(getNextStep(nextStep));
    }, []);

    const handleForgotPassword = useCallback(() => {
        setLoginStep(LoginStep.RESET_PASSWORD);
    }, []);

    const handleUserNameUpdate = useCallback((username: string) => {
        setResetPasswordUsername(username);
    }, []);

    const handleHaveCode = useCallback(() => {
        setLoginStep(LoginStep.CONFIRM_RESET_PASSWORD);
    }, []);

    const handlePasswordReset = useCallback(() => {
        setLoginStep(LoginStep.LOGIN);
    }, []);

    return (
        <Card sx={{ margin: "60px", display: "flex", justifyContent: "center", backgroundColor: "#e6e6e6" }}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={6}>
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%" padding="80px !important">
                        <Avatar sx={{ width: 400, height: 400 }} src={avatarLink} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    {
                        loginStep === LoginStep.LOGIN &&
                        <LoginForm
                            onNextStep={handleNextStep}
                            onForgotPassword={handleForgotPassword}
                        />
                    }
                    {
                        loginStep === LoginStep.CONFIRM_SIGNIN &&
                        <ConfirmSignIn
                            onNextStep={handleNextStep}
                        />
                    }
                    {
                        loginStep === LoginStep.RESET_PASSWORD &&
                        <ResetPasswordForm
                            onNextStep={handleNextStep}
                            onUsernameUpdate={handleUserNameUpdate}
                            onHaveCode={handleHaveCode}
                        />
                    }
                    {
                        loginStep === LoginStep.CONFIRM_RESET_PASSWORD &&
                        <ConfirmResetPassword
                            onPasswordReset={handlePasswordReset}
                            usernameEntered={resetPasswordUsername}
                        />
                    }
                </Grid>
            </Grid>
        </Card>
    )
}

export default React.memo(Login);