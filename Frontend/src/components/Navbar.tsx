import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";
import logo from "../assets/logo (2).png";
import { useState } from "react";

export const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">
                    <img src={logo} alt="logo" className="navbar-logo" />
                </Link>
            </div>

            {/* Botón hamburguesa */}
            <div className="navbar-hamburger" onClick={toggleMenu}>
                ☰
            </div>

            <div className={`navbar-center ${menuOpen ? "active" : ""}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
                <Link to="/catalogo" onClick={() => setMenuOpen(false)}>Explorar Frutas</Link>
                {user && (
                    <Link to="/registrar" onClick={() => setMenuOpen(false)}>
                        Agregar fruta
                    </Link>
                )}
                {user?.role === "admin" && (
                    <Link to="/admin" onClick={() => setMenuOpen(false)}>
                        Panel Admin
                    </Link>
                )}
            </div>

            <div className={`navbar-right ${menuOpen ? "active" : ""}`}>
                {user ? (
                    <>
                        <span className="navbar-username">👤 {user.username}</span>
                        <button className="navbar-login-button" onClick={handleLogout}>
                            Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="navbar-login-button" onClick={() => setMenuOpen(false)}>
                            Sign In
                        </Link>
                        <Link to="/register" className="navbar-login-button" onClick={() => setMenuOpen(false)}>
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};
