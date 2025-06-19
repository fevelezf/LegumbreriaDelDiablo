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
};

export const Catalogo: React.FC = () => {
    const [frutas, setFrutas] = useState<Fruta[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setFrutas(frutasData); // ✅ cargamos las frutas del archivo JSON
    }, []);

    return (
        <div className="catalogo-container">
            <h2>Enciclopedia de Frutas del Diablo</h2>
            <p className="catalogo-descripcion">
                Explora todas las frutas descubiertas hasta ahora, conoce sus habilidades,
                orígenes, y lo que opinan otros usuarios del mar.
            </p>

            <div className="grid-frutas">
                {frutas.map((fruta) => (
                    <div className="tarjeta-fruta" key={fruta.id}>
                        <img src={fruta.imagen} alt={fruta.nombre} />
                        <h3>{fruta.nombre}</h3>
                        <p><strong>Tipo:</strong> {fruta.tipo}</p>
                        <p className="descripcion">{fruta.descripcion}</p>
                        <button onClick={() => navigate(`/detalle/${fruta.id}`)}>
                            Calificar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
