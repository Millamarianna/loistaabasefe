import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
    auth: {},
    setAuth: () => { },
    isLoggedIn: false,
    setLoggedIn: () => {},
});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const updateAuthFromCookie = async () => {
            const jwtCookie = document.cookie.split("; ").find((row) => row.startsWith("jwt="));
            console.log("AuthProvider, cookie:" + jwtCookie + " auth:" + JSON.stringify(auth));

            if (jwtCookie) {
                const jwtToken = jwtCookie.split("=")[1];

                const response = await fetch("https://fam-backend-base.azurewebsites.net/users/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    console.log("Authprovider, if response ok, userdata:" + JSON.stringify(userData));
                    userData["token"] = jwtToken;
                    setAuth((prevAuth) => {
                        console.log("Authprovider, getuserdata, if response ok, auth:" + JSON.stringify(prevAuth));
                        return userData;
                    });
                    setLoggedIn(true);
                }
            }
        };

        updateAuthFromCookie();
    }, []);

    return <AuthContext.Provider value={{ auth, setAuth, isLoggedIn, setLoggedIn }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;
