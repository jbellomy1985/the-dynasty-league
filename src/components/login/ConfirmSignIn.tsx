import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { ConfirmSignInOutput } from "aws-amplify/auth";
import { Send as SendIcon, VisibilityOff, Visibility } from "@mui/icons-material";
import {
    Typography,
    Box,
    FormControl,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    InputAdornment,
    IconButton,
    Button,
    CircularProgress,
    Alert,
    AlertTitle
} from "@mui/material";

import PasswordValidation, { PasswordValidationType } from "./PasswordValidation";
import PasswordRules from "./PasswordRules";
import { LoginAPI } from "../../web-api";

type ConfirmSignInType = {
    onNextStep?: Function | null;
    onToastMessage?: Function | null;
}

function ConfirmSignIn({
    onNextStep = null,
    onToastMessage = null
}: ConfirmSignInType) {
    const [isConfirming, setIsConfirming] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // new Password
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<string>("");
    const [validations, setValidations] = useState<PasswordValidationType>(PasswordValidation.defaultValidations);
    // confirm password
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    useEffect(() => {
        setValidations(PasswordValidation.validate(newPassword));
    }, [newPassword]);

    const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);
    const handleClickShowConfirmPassword = useCallback(() => setShowConfirmPassword((show) => !show), []);

    const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }, []);

    const handleNewPasswordChange = useCallback((event:  ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
    }, []);

    const handleConfirmPasswordChange = useCallback((event:  ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    }, []);

    const handleConfirmSignIn = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setError(null);
        setIsConfirming(true);
        LoginAPI.handleConfirmSignIn({ challengeResponse: newPassword })
            .then((output: ConfirmSignInOutput) => {
                onToastMessage?.("Successfully updated password!");
                const { nextStep: { signInStep} } = output;
                if(signInStep) {
                    onNextStep?.(signInStep);
                }
            })
            .catch((error: any) => {
                setError(error.message);
            }).finally(() => {
                setIsConfirming(false);
            })
    }, [newPassword]);

    return (
        <>
            <Typography variant="h3" component="div">
                Password Update Required!
            </Typography>
            <Typography variant="h5" component="div" sx={{ opacity: 0.4, marginBottom: 4 }}>
                Enter your new password for your account
            </Typography>
            {
                error &&
                <Alert severity="error" sx={{ marginRight: 2, marginTop: 4, marginBottom: 4 }}>
                    <AlertTitle>We encourted an issue while trying to update your password.</AlertTitle>
                    {error}
                </Alert>
            }
            <Box paddingRight={20} marginTop={4}>
                <form onSubmit={handleConfirmSignIn}>
                    <FormControl
                        fullWidth
                        required
                        variant="outlined"
                        sx={{ backgroundColor: "white", marginBottom: 4 }}
                    >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            disabled={isConfirming}
                            error={!newPassword || Boolean(!Object.values(validations).every(Boolean))}
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
                            value={newPassword}
                            onChange={handleNewPasswordChange} />
                    </FormControl>
                    <FormControl
                        fullWidth
                        required
                        variant="outlined"
                        error={!confirmPassword || newPassword !== confirmPassword}
                        sx={{ backgroundColor: "white", marginBottom: 4 }}
                    >
                        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            disabled={isConfirming}
                            endAdornment={<InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange} />
                        {
                            (newPassword !== confirmPassword) &&
                            <FormHelperText sx={{ margin: 0, padding: "0 14px", backgroundColor: "#e6e6e6" }} id="confirm-password-helper-text">
                                Confirm Password must match new password
                            </FormHelperText>
                        }
                    </FormControl>
                    <Button
                        sx={{ width: "110px", height: "37px", marginBottom: 2 }}
                        disabled={isConfirming || !Object.values(validations).every(Boolean) || newPassword !== confirmPassword}
                        type="submit"
                        variant="contained"
                        endIcon={<SendIcon />}>
                        {isConfirming ? <CircularProgress size={25} /> : "Confirm"}
                    </Button>
                    <PasswordRules validations={validations} />
                </form>
            </Box>
        </>
    );
}

export default React.memo(ConfirmSignIn);