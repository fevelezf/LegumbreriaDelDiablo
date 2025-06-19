import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Tyc.css";

export const Tyc: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const form = location.state?.form || {};

    const handleAceptar = () => {
        navigate("/register", {
            state: {
                form,
                aceptaTerminos: true,
            },
        });
    };

    return (
        <div className="tyc-container">
            <h1>Términos y Condiciones</h1>

            <p>
                Bienvenido a <strong>La Legumbrería del Diablo</strong>. Al registrarte y usar nuestra plataforma, aceptas las siguientes condiciones:
            </p>

            <ul>
                <li>Este sitio es un catálogo informativo de Frutas del Diablo, no un comercio real.</li>
                <li>Los comentarios deben ser respetuosos, sin lenguaje ofensivo ni contenido inapropiado.</li>
                <li>No está permitido publicar contenido que infrinja derechos de autor o privacidad.</li>
                <li>Los datos ingresados solo se usan para fines educativos o de simulación.</li>
                <li>El equipo puede moderar o eliminar contenido que no cumpla con estas reglas.</li>
            </ul>

            <p>Al continuar, confirmas que has leído y aceptas estos términos. ¡Gracias por ser parte de esta aventura pirata!</p>
            <button className="continuar-btn" onClick={handleAceptar}>
                ✅ Aceptar y volver
            </button>
        </div>
    );
};
