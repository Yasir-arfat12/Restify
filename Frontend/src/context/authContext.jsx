import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        const loadUser = async () => {

            try {

                const response = await API.get("/users/profile");

                setUser(response.data);

            } catch (error) {

                console.error("Authentication failed:", error);

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setUser(null);

            } finally {

                setLoading(false);

            }
        };

        loadUser();

    }, []);

    const login = async (email, password) => {

        const response = await API.post("/users/login", {
            email,
            password
        });

        const userData = response.data;

        localStorage.setItem("token", userData.token);

        localStorage.setItem(
            "user",
            JSON.stringify({
                _id: userData._id,
                name: userData.name,
                email: userData.email,
                role: userData.role
            })
        );

        setUser({
            _id: userData._id,
            name: userData.name,
            email: userData.email,
            role: userData.role
        });

        return userData;
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);

    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout,
                loading,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};