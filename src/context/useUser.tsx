import { useContext } from "react";
import { UserContext, UserContextType } from "./UserContext";

export default function useUser(): UserContextType {
    const user = useContext(UserContext);
    return user;
}