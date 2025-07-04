import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Catalogo.css";
import frutasData from "../data/frutas.json";

type Fruta = {
    id: string;
    nombre: string;
    tipo: string;
    descripcion: string;
    imagen: string;
    calificaciones?: number[];
};

export const Catalogo: React.FC = () => {
    const [frutas, setFrutas] = useState<Fruta[]>([]);
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("");
    const [ordenAlfabetico, setOrdenAlfabetico] = useState<"asc" | "desc" | "">("");
    const navigate = useNavigate();

    useEffect(() => {
        setFrutas(frutasData);
    }, []);

    const calcularPromedio = (calificaciones?: number[]) => {
        if (!calificaciones || calificaciones.length === 0) return "Sin calificaciones";
        const suma = calificaciones.reduce((a, b) => a + b, 0);
        return (suma / calificaciones.length).toFixed(1);
    };

    const frutasFiltradas = frutas
        .filter(fruta =>
            fruta.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
            (filtroTipo === "" || fruta.tipo.toLowerCase() === filtroTipo.toLowerCase())
        )
        .sort((a, b) => {
            if (ordenAlfabetico === "asc") {
                return a.nombre.localeCompare(b.nombre);
            } else if (ordenAlfabetico === "desc") {
                return b.nombre.localeCompare(a.nombre);
            }
            return 0;
        });

    return (
        <div className="catalogo-container">
            <h2>Enciclopedia de Frutas del Diablo</h2>
            <p className="catalogo-descripcion">
                Explora todas las frutas descubiertas hasta ahora, conoce sus habilidades,
                orígenes, y lo que opinan otros usuarios del mar.
            </p>

            {/* Filtros */}
            <div className="filtros">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={filtroNombre}
                    onChange={(e) => setFiltroNombre(e.target.value)}
                />

                <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
                    <option value="">Todos los tipos</option>
                    <option value="Paramecia">Paramecia</option>
                    <option value="Zoan">Zoan</option>
                    <option value="Logia">Logia</option>
                    {/* Agrega otros tipos si los tienes en tus datos */}
                </select>

                <select value={ordenAlfabetico} onChange={(e) => setOrdenAlfabetico(e.target.value as "asc" | "desc" | "")}>
                    <option value="">Sin orden</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>

            <div className="grid-frutas">
                {frutasFiltradas.map((fruta) => (
                    <div className="tarjeta-fruta" key={fruta.id}>
                        <img src={fruta.imagen} alt={fruta.nombre} />
                        <h3>{fruta.nombre}</h3>
                        <p><strong>Tipo:</strong> {fruta.tipo}</p>
                        <p className="descripcion">{fruta.descripcion}</p>
                        <p><strong>Promedio de Calificación:</strong> {calcularPromedio(fruta.calificaciones)} ⭐</p>
                        <button onClick={() => navigate(`/detalle/${fruta.id}`)}>
                            Calificar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
