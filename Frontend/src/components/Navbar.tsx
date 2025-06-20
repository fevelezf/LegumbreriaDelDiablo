import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";
import logo from "../assets/logo (2).png";

export const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="navbar-left">
                <Link to="/">
                    <img src={logo} alt="logo" className="navbar-logo" />
                </Link>
            </div>

            {/* enlaces para ir a otra pagina */}
            <div className="navbar-center">
                <Link to="/">Inicio</Link>
                <Link to="/buscar">Buscar una fruta</Link>
                {user && <Link to="/registrar">Agregar fruta</Link>}
                {/* solo para administrador */}
                {user?.role === "admin" && <Link to="/admin">Panel Admin</Link>}
            </div>

            {/* autenticación */}
            <div className="navbar-right">
                {user ? (
                    <>
                        <span className="navbar-username">👤 {user.username}</span>
                        <button className="navbar-login-button" onClick={handleLogout}>
                            Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="navbar-login-button">Sign In</Link>
                        <Link to="/register" className="navbar-login-button">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};
