import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";
import frutaImage from "../assets/logo.png";

export const Login: React.FC = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        if (usuario === "admin" && password === "admin123") {
            login({ username: "admin", email: "admin@mail.com", role: "admin" });
            navigate("/admin");
        } else if (usuario === "luffy" && password === "gomu123") {
            login({ username: "luffy", email: "luffy@mail.com", role: "usuario" });
            navigate("/catalogo");
        } else {
            setError("Usuario o contraseña incorrectos.");
        }
    };

    return (
        <div className="login-wrapper">
            {/* Columna izquierda: imagen */}
            <div className="login-image">
                <img src={frutaImage} alt="Fruta del Diablo" />
            </div>

            {/* Columna derecha: formulario */}
            <div className="login-form-container">
                <div className="login-form-content">
                    <h2>Bienvenido de Vuelta a la Legumbreria del Diablo</h2>
                    {error && <p className="error-msg">{error}</p>}

                    <input
                        type="text"
                        placeholder="Usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button onClick={handleLogin}>Entrar</button>

                    <p className="registro-link">
                        ¿No tienes cuenta? <a href="/register">Regístrate</a>
                    </p>
                </div>
            </div>
        </div>
    );
};
