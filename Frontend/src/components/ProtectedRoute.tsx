// src/components/ProtectedRoute.tsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

type Props = {
    allowedRoles: string[];
    children: ReactNode;
};


export const ProtectedRoute = ({ allowedRoles, children }: Props) => {
    const { user } = useAuth();

    // Si no ha iniciado sesión
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Si el rol del usuario no está permitido
    if (!allowedRoles.includes(user.role)) {
        return <h2 style={{ padding: "2rem", textAlign: "center", color: "crimson" }}>
            ⛔ Acceso denegado. No tienes permisos para ver esta página.
        </h2>;
    }

    // Usuario autorizado
    return children;
};
