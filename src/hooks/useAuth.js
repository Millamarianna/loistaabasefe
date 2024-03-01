import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const { auth, setAuth, isLoggedIn, setLoggedIn } = useContext(AuthContext);
    return { auth, setAuth, isLoggedIn, setLoggedIn };
}

export default useAuth;