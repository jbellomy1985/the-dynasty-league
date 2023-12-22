import { createContext, useCallback, useMemo, useReducer, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import React from "react";

export enum Severity {
    ERROR,
    WARNING,
    INFO,
    SUCCESS
}

export type SnackbarContextType = {
    createToast: Function;
}

export const SnackbarContext = createContext<SnackbarContextType>({
    createToast: () => {}
});

function getSeverityString(severity: Severity) {
    switch(severity) {
        case Severity.ERROR:
            return "error";
        case Severity.WARNING:
            return "warning";
        case Severity.INFO:
            return "info";
        case Severity.SUCCESS:
        default:
            return "success";
    }
}

type SnackbarState = {
    message: string | null;
    severity: Severity;
}

type Payload = {
    message: string | null;
    severity?: Severity | null;
}

function snackbarReducer(state: SnackbarState, payload: Payload): SnackbarState {
    const { message, severity } = payload;

    if(!severity) return {...state, message, severity: Severity.SUCCESS};

    return {...state, message, severity};
}

export const SnackbarContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [snackbarState, dispatcher] = useReducer(snackbarReducer, { message: null, severity: Severity.SUCCESS });

    const createToast = useCallback((message: string, severity: Severity) => {
        dispatcher({ message, severity });
    }, []);

    const handleHideToast = useCallback(() => dispatcher({ message: null }), []);

    const value = useMemo(() => ({
        createToast,
    }), [createToast]);

    return <SnackbarContext.Provider value={value}>
        <Snackbar
          open={Boolean(snackbarState.message)}
          autoHideDuration={5000}
          onClose={handleHideToast}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <Alert severity={getSeverityString(snackbarState.severity)} sx={{width: "100%"}} onClose={handleHideToast}>
              {snackbarState.message}
          </Alert>
        </Snackbar>
        {children}
    </SnackbarContext.Provider>;
}