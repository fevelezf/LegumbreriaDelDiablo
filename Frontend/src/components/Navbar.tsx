// src/components/Navbar.tsx

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";
import logo from "../assets/logo (1).png";

export const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar">
            {/* Logo opcional */}
            <div className="navbar-left">
                <Link to="/">
                    <img src={logo} alt="logo" className="navbar-logo" />
                </Link>
            </div>

            {/* Enlaces de navegación */}
            <div className="navbar-center">
                <Link to="/">Inicio</Link>
                <Link to="/buscar">Buscar una fruta</Link>
                {user && <Link to="/registrar">Agregar fruta</Link>}
            </div>

            {/* Acciones de autenticación */}
            <div className="navbar-right">
                {!user ? (
                    <>
                        <Link to="/login" className="navbar-login-button">Sign In</Link>
                        <Link to="/register" className="navbar-login-button">Sign Up</Link>
                    </>
                ) : (
                    <button className="navbar-login-button" onClick={handleLogout}>
                        Sign Out
                    </button>
                )}
            </div>
        </nav>
    );
};
