import { useState} from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Register.css";
import signinImage from "../assets/signin.png";

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const estadoPrevio = location.state || {};

    const [form, setForm] = useState({
        nombre: estadoPrevio.form?.nombre || "",
        email: estadoPrevio.form?.email || "",
        username: estadoPrevio.form?.username || "",
        password: estadoPrevio.form?.password || "",
    });

    const [aceptaTerminos, setAceptaTerminos] = useState(estadoPrevio.aceptaTerminos || false);
    const [error, setError] = useState("");

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

        if (!aceptaTerminos) {
            setError("Debes aceptar los términos y condiciones para registrarte.");
            return;
        }

        login({ username, email, role: "usuario" });
        navigate("/catalogo");
    };

    return (
        <div className="register-wrapper">
            <div className="register-image">
                <img src={signinImage} alt="Fruta del Diablo" />
            </div>

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

                    <label className="terminos-label">
                        <input
                            type="checkbox"
                            checked={aceptaTerminos}
                            onChange={(e) => setAceptaTerminos(e.target.checked)}
                        />
                        &nbsp;Acepto los{" "}
                        <Link
                            to="/terminos"
                            state={{ form, aceptaTerminos }}
                            className="terminos-link"
                        >
                            términos y condiciones
                        </Link>
                    </label>

                    <button onClick={handleSubmit}>Registrarse</button>
                </div>
            </div>
        </div>
    );
};
