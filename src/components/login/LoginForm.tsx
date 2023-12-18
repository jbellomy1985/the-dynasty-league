import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";

import { Send as SendIcon, VisibilityOff, Visibility } from "@mui/icons-material";
import { Typography, Box, FormControl, InputLabel, OutlinedInput, FormHelperText, InputAdornment, IconButton, Button, CircularProgress } from "@mui/material";

import { LoginAPI } from "../../web-api";
import { SignInOutput } from "aws-amplify/auth";

type LoginFormType = {
    onNextStep?: Function | null;
    onForgotPassword?: Function | null;
}

function LoginForm({
    onNextStep = null,
    onForgotPassword = null
}: LoginFormType) {
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);

    const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }, []);

    const handleUsernameChange = useCallback((event:  ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }, []);

    const handlePasswordChange = useCallback((event:  ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, []);

    const handleSignIn = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setError(null);
        setIsSigningIn(true);
        LoginAPI.handleSignIn({ username, password })
            .then((output: SignInOutput) => {
                const { nextStep: { signInStep} } = output;
                if(signInStep) {
                    onNextStep?.(signInStep);
                }
            })
            .catch((error: any) => {
                setError(error.message);
            }).finally(() => {
                setIsSigningIn(false);
            });
    }, [onNextStep, username, password]);

    const handleForgotPassword = useCallback(() => {
        onForgotPassword?.();
    }, [onForgotPassword]);

    return (
        <>
            <Typography variant="h3" component="div">
                Welcome back!
            </Typography>
            <Typography variant="h5" component="div" sx={{ opacity: 0.4, marginBottom: 10 }}>
                Enter your credentials to access your account
            </Typography>
            <Box paddingRight={20}>
                <form onSubmit={handleSignIn}>
                    <FormControl
                        fullWidth
                        variant="outlined"
                        error={Boolean(error)}
                        sx={{ marginBottom: 4, backgroundColor: "white" }}
                    >
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <OutlinedInput
                            id="username"
                            disabled={isSigningIn}
                            value={username}
                            onChange={handleUsernameChange} />
                        {error && <FormHelperText sx={{ margin: 0, padding: "0 14px", backgroundColor: "#e6e6e6" }} id="username-or-email-helper-text">{error}</FormHelperText>}
                    </FormControl>
                    <FormControl
                        fullWidth
                        variant="outlined"
                        error={Boolean(error)}
                        sx={{ backgroundColor: "white", marginBottom: 4 }}
                    >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            disabled={isSigningIn}
                            endAdornment={<InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>}
                            value={password}
                            onChange={handlePasswordChange} />
                        {error && <FormHelperText sx={{ margin: 0, padding: "0 14px", backgroundColor: "#e6e6e6" }} id="password-helper-text">{error}</FormHelperText>}
                    </FormControl>
                    <Button
                        sx={{ width: "110px", height: "37px" }}
                        disabled={!username || !password || isSigningIn}
                        type="submit"
                        variant="contained"
                        endIcon={<SendIcon />}>
                        {isSigningIn ? <CircularProgress size={25} /> : "Submit"}
                    </Button>
                    <Button
                        disabled={isSigningIn}
                        variant="text"
                        sx={{ marginLeft: 5 }}
                        onClick={handleForgotPassword}
                    >
                        Forgot Password?
                    </Button>
                </form>
            </Box>
        </>
    );
}

export default React.memo(LoginForm);