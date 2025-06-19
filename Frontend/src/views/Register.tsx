// src/views/Register.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Register.css";
import signinImage from "../assets/signin.jpg";

export const Register: React.FC = () => {
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const validarPassword = (pass: string) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pass);
    };

    const handleSubmit = () => {
        const { nombre, email, username, password } = form;

        if (!nombre || !email || !username || !password) {
            setError("Por favor completa todos los campos.");
            return;
        }

        if (!validarPassword(password)) {
            setError(
                "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números."
            );
            return;
        }

        // Simulación de registro exitoso
        login({ username, email, role: "usuario" });
        navigate("/catalogo");
    };

    return (
        <div className="register-wrapper">
            {/* Columna izquierda: imagen */}
            <div className="register-image">
                <img src={signinImage
                
                } alt="Fruta del Diablo" />
            </div>

            {/* Columna derecha: formulario */}
            <div className="register-form-container">
                <div className="register-form-content">
                    <h2>Regístrate y encuentra tu fruta prohibida</h2>

                    {error && <p className="error-msg">{error}</p>}

                    <input
                        type="text"
                        placeholder="Nombre completo"
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    />

                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        type="text"
                        placeholder="Usuario"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <p className="password-hint">
                        Tu contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números.
                    </p>

                    <button onClick={handleSubmit}>Registrarse</button>
                </div>
            </div>
        </div>
    );
};
