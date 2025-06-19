// Importo navegador y estilos
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

// Vista de bienvenida
export const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            {/* Capa oscura sobre el fondo para legibilidad */}
            <div className="overlay"></div>

            <div className="home-content">
                <h1>🍇 La Legumbrería del Diablo 🍇</h1>

                <p className="home-intro">
                    Este es un espacio dedicado a explorar las misteriosas y poderosas <strong>Frutas del Diablo</strong>.
                    Aquí podrás conocer sus tipos, efectos, origen y leer las experiencias de otros usuarios del Grand Line.
                </p>

                <p>
                    ¿Has escuchado de alguna? ¿Quieres dejar tu opinión? Descubre el catálogo y califica las frutas que te intrigan.
                </p>

                <button className="home-btn" onClick={() => navigate("/catalogo")}>
                    Explorar Frutas
                </button>
            </div>
        </div>
    );
};
