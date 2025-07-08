import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";


type UserType = {
    username: string;
    email: string;
    role: "usuario" | "admin";
    token: string;
};


type AuthContextType = {
    user: UserType | null;
    login: (userData: UserType) => void;
    logout: () => void;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);

    const login = (userData: UserType) => {
        setUser(userData);
        localStorage.setItem("authUser", JSON.stringify(userData));
        localStorage.setItem("token", userData.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("authUser");
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("authUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
    }
    return context;
};
