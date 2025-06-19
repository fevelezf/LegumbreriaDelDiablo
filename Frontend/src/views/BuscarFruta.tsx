import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BuscarFruta.css";
import { VolverButton } from "../components/VolverButton";
import frutasData from "../data/frutas.json";

type Fruta = {
    id: string;
    nombre: string;
    tipo: string;
    descripcion: string;
    imagen?: string;
};

export const BuscarFruta: React.FC = () => {
    const navigate = useNavigate();

    const [filtros, setFiltros] = useState({ nombre: "", tipo: "" });
    const [resultados, setResultados] = useState<Fruta[]>([]);
    const [buscado, setBuscado] = useState(false);

    // búsqueda desde JSON
    const buscarFrutas = () => {
        const filtradas = frutasData.filter((fruta) => {
            const coincideNombre = fruta.nombre
                .toLowerCase()
                .includes(filtros.nombre.toLowerCase());
            const coincideTipo = filtros.tipo
                ? fruta.tipo.toLowerCase() === filtros.tipo.toLowerCase()
                : true;
            return coincideNombre && coincideTipo;
        });

        setResultados(filtradas);
        setBuscado(true);
    };

    return (
        <div className="buscar-container">
            <h2>Buscar Fruta del Diablo</h2>

            <div className="formulario-busqueda">
                <input
                    type="text"
                    placeholder="Nombre (opcional)"
                    value={filtros.nombre}
                    onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Tipo (Logia, Paramecia, Zoan)"
                    value={filtros.tipo}
                    onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
                />
                <button onClick={buscarFrutas}>Buscar</button>
            </div>

            <div className="resultados">
                {buscado && resultados.length === 0 ? (
                    <p className="mensaje-vacio">No se han encontrado frutas.</p>
                ) : (
                    <ul>
                        {resultados.map((fruta) => (
                            <li
                                key={fruta.id}
                                className="resultado-clickable"
                                onClick={() => navigate(`/detalle/${fruta.id}`)}
                            >
                                <strong>{fruta.nombre}</strong> ({fruta.tipo})<br />
                                <em>{fruta.descripcion}</em>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <VolverButton ruta="/catalogo" />
        </div>
    );
};
