import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";
import loginImage from "../assets/login.png";
import { login as loginRequest } from "../services/authService";

export const Login: React.FC = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await loginRequest({ email: usuario, password });

            login({
                username: res.username,
                email: res.email,
                role: res.role,
                token: res.token,
            });

            navigate(res.role === "admin" ? "/admin" : "/catalogo");
        } catch (err) {
            console.error("Error en login", err);
            setError("❌ Usuario o contraseña incorrectos.");
        }
    };

    return (
        <div className="login-wrapper">
            {/* Columna izquierda: imagen */}
            <div className="login-image">
                <img src={loginImage} alt="Fruta del Diablo" />
            </div>

            {/* Columna derecha: formulario */}
            <div className="login-form-container">
                <div className="login-form-content">
                    <h2>Bienvenido de Vuelta a la Legumbrería del Diablo</h2>
                    {error && <p className="error-msg">{error}</p>}

                    <input
                        type="text"
                        placeholder="Correo electrónico"
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
