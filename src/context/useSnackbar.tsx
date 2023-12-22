import { useContext } from "react";
import { SnackbarContext, SnackbarContextType } from "./SnackbarContext";

export default function useSnackbar(): SnackbarContextType {
    const snackbar = useContext(SnackbarContext);
    return snackbar;
}