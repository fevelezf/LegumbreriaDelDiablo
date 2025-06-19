import { Link } from "react-router-dom";
import "../styles/NotFound.css";

// Página de error 404 para rutas no existentes
export const NotFound: React.FC = () => {
    return (
        <div className="notfound-container">
            <h1>🌀 404 - Fruta no encontrada</h1>
            <p>
                Parece que te adentraste demasiado en el Nuevo Mundo...
                <br />
                Esta página no existe o ha sido tragada por el mar.
            </p>
            <Link to="/" className="btn-volver">
                Volver a la Enciclopedia
            </Link>
        </div>
    );
};
