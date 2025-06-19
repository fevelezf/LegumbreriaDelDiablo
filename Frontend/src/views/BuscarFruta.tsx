// Importo hooks necesarios y estilos
import { useState } from "react";
import "../styles/BuscarFruta.css";

// Tipo de dato para una fruta
type Fruta = {
    id: string;
    nombre: string;
    tipo: string;
    descripcion: string;
};

// Componente funcional para la búsqueda de frutas
export const BuscarFruta: React.FC = () => {
    // Estado para filtros de búsqueda
    const [filtros, setFiltros] = useState({ nombre: "", tipo: "" });

    // Estado para resultados simulados
    const [resultados, setResultados] = useState<Fruta[]>([]);

    // Frutas simuladas para mostrar resultados
    const frutasSimuladas: Fruta[] = [
        {
            id: "1",
            nombre: "Gomu Gomu no Mi",
            tipo: "Paramecia",
            descripcion: "Convierte el cuerpo en goma.",
        },
        {
            id: "2",
            nombre: "Mera Mera no Mi",
            tipo: "Logia",
            descripcion: "Permite controlar fuego.",
        },
        {
            id: "3",
            nombre: "Hie Hie no Mi",
            tipo: "Logia",
            descripcion: "Permite controlar hielo.",
        },
    ];

    // Función que filtra frutas según los campos
    const buscarFrutas = () => {
        const filtradas = frutasSimuladas.filter((fruta) => {
            const coincideNombre = fruta.nombre
                .toLowerCase()
                .includes(filtros.nombre.toLowerCase());
            const coincideTipo = filtros.tipo
                ? fruta.tipo.toLowerCase() === filtros.tipo.toLowerCase()
                : true;
            return coincideNombre && coincideTipo;
        });

        setResultados(filtradas);
    };

    return (
        <div className="buscar-container">
            <h2>Buscar Fruta del Diablo</h2>

            {/* Formulario de búsqueda */}
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

            {/* Resultados */}
            <div className="resultados">
                {resultados.length === 0 ? (
                    <p>No se han encontrado frutas aún.</p>
                ) : (
                    <ul>
                        {resultados.map((fruta) => (
                            <li key={fruta.id}>
                                <strong>{fruta.nombre}</strong> ({fruta.tipo})<br />
                                <em>{fruta.descripcion}</em>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
