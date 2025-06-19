import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";


// Tipo del usuario que se va a manejar
type UserType = {
    username: string;
    email: string;
    role: "usuario" | "admin";
};

// Define el tipo del contexto, con lo que se puede usar en la app
type AuthContextType = {
    user: UserType | null; // Usuario autenticado, o null si no está logueado
    login: (userData: UserType) => void; // Función para iniciar sesión
    logout: () => void; // Función para cerrar sesión
};

// Crea el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// proveedor que se usa en App.tsx
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Estado que mantiene al usuario actual
    const [user, setUser] = useState<UserType | null>(null);

    // Función para iniciar sesión: guarda los datos del usuario en el estado y en localStorage
    const login = (userData: UserType) => {
        setUser(userData);
        localStorage.setItem("authUser", JSON.stringify(userData)); // Persiste en el navegador
    };

    // Función para cerrar sesión: borra los datos del usuario
    const logout = () => {
        setUser(null);
        localStorage.removeItem("authUser");
    };

    // Al cargar la app, intenta recuperar el usuario desde localStorage
    React.useEffect(() => {
        const storedUser = localStorage.getItem("authUser");
        if (storedUser) setUser(JSON.parse(storedUser)); // Si existe, lo asigna al estado
    }, []);

    // Provee el contexto a los hijos
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para consumir el contexto más fácilmente
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
    }
    return context;
};
