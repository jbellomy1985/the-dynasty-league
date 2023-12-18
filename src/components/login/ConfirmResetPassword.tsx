import React, { ChangeEvent, useEffect, useCallback, useState, FormEvent } from "react";

import { Send as SendIcon, Visibility, VisibilityOff} from "@mui/icons-material";
import {
    Typography,
    Box,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button,
    CircularProgress,
    TextField,
    IconButton,
    InputAdornment,
    Alert,
    AlertTitle
} from "@mui/material";

import PasswordValidation, { PasswordValidationType } from "./PasswordValidation";
import PasswordRules from "./PasswordRules";
import { LoginAPI } from "../../web-api";

type ConfirmResetPasswordType = {
    onPasswordReset?: Function | null;
    onToastMessage?: Function | null;
    usernameEntered?: string | null;
}

function ConfirmResetPassword({
    onPasswordReset = null,
    onToastMessage = null,
    usernameEntered = null
}: ConfirmResetPasswordType) {
    const [isReseting, setIsReseting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Username
    const [username, setUsername] = useState<string>("");

    // Confirmation Code
    const [confirmCode, setConifrmCode] = useState<string>("");

    // new Password
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<string>("");
    const [validations, setValidations] = useState<PasswordValidationType>(PasswordValidation.defaultValidations);

    // const { user } = useUser();

    useEffect(() => {
        setValidations(PasswordValidation.validate(newPassword));
    }, [newPassword]);

    const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);

    const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }, []);

    const handleUsernameChange = useCallback((event:  ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }, []);

    const handleNewPasswordChange = useCallback((event:  ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
    }, []);

    const handleConfirmCodeChange = useCallback((event:  ChangeEvent<HTMLInputElement>) => {
        setConifrmCode(event.target.value);
    }, []);

    const handleConfirmResetPassword = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setError(null);
        setIsReseting(true);
        LoginAPI.handleConfirmResetPassword({ username: (usernameEntered || username), confirmationCode: confirmCode, newPassword })
            .then(() => {
                onToastMessage?.("Successfully updated password!");
                onPasswordReset?.();
            })
            .catch((error: any) => {
                setError(error.message);
            }).finally(() => {
                setIsReseting(false);
            })
    }, [username, confirmCode, newPassword]);

    return (
        <>
            <Typography variant="h3" component="div">
                Reset Password
            </Typography>
            <Typography variant="h5" component="div" sx={{ opacity: 0.4, marginBottom: 4 }}>
                Please update your password and provide the verification code sent to your email
            </Typography>
            {
                error &&
                <Alert severity="error" sx={{ marginRight: 2, marginTop: 4, marginBottom: 4 }}>
                    <AlertTitle>We encourted an issue while trying to update your password.</AlertTitle>
                    {error}
                </Alert>
            }
            <Box paddingRight={20}>
                <form onSubmit={handleConfirmResetPassword}>
                    {
                        usernameEntered &&
                        <TextField
                            id="username_read_only"
                            label="Username"
                            defaultValue={usernameEntered}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ marginBottom: 4 }}
                        />
                    }
                    {
                        !usernameEntered &&
                        <FormControl
                            fullWidth
                            required
                            error={!username}
                            variant="outlined"
                            sx={{ marginBottom: 4, backgroundColor: "white" }}
                        >
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <OutlinedInput
                                id="username"
                                disabled={isReseting}
                                value={username}
                                onChange={handleUsernameChange} />
                        </FormControl>
                    }
                    <FormControl
                        fullWidth
                        required
                        variant="outlined"
                        sx={{ marginBottom: 4, backgroundColor: "white" }}
                    >
                        <InputLabel htmlFor="confirmCode">Confirmation Code</InputLabel>
                        <OutlinedInput
                            id="confirmCode"
                            disabled={isReseting}
                            error={!confirmCode}
                            value={confirmCode}
                            onChange={handleConfirmCodeChange} />
                    </FormControl>
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
                            disabled={isReseting}
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
                    <Button
                        sx={{ width: "110px", height: "37px", marginBottom: 2 }}
                        disabled={!confirmCode || !newPassword || isReseting}
                        type="submit"
                        variant="contained"
                        endIcon={<SendIcon />}>
                        {isReseting ? <CircularProgress size={25} /> : "Reset"}
                    </Button>
                    <PasswordRules validations={validations} />
                </form>
            </Box>
        </>
    );
}

export default React.memo(ConfirmResetPassword);