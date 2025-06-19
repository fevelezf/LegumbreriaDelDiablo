import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Catalogo.css";
import gomuImg from "../assets/gomu.jpeg";
import meraImg from "../assets/mera.jpg";
import opeImg from "../assets/opeope.jpeg";


// Defino el tipo de dato para una fruta
type Fruta = {
    id: string;
    nombre: string;
    tipo: string;
    descripcion: string;
    imagen: string;
};

// Componente principal del catálogo de frutas
export const Catalogo: React.FC = () => {
    // Estado que contiene la lista de frutas (aquí simulada)
    const [frutas, setFrutas] = useState<Fruta[]>([]);


    const navigate = useNavigate();

    // para simular carga de datos inicial
    useEffect(() => {

        setFrutas([
            {
                id: "1",
                nombre: "Gomu Gomu no Mi",
                tipo: "Paramecia",
                descripcion: "Convierte el cuerpo del usuario en goma elástica.",
                imagen: gomuImg
            },
            {
                id: "2",
                nombre: "Mera Mera no Mi",
                tipo: "Logia",
                descripcion: "Permite al usuario convertirse en fuego.",
                imagen: meraImg
            },
            {
                id: "3",
                nombre: "Ope Ope no Mi",
                tipo: "Paramecia",
                descripcion: "Permite realizar cirugías perfectas dentro de un área.",
                imagen: opeImg
            }
        ]);
    }, []);

    return (
        <div className="catalogo-container">
            <h2>Enciclopedia de Frutas del Diablo</h2>
            <p className="catalogo-descripcion">
                Explora todas las frutas descubiertas hasta ahora, conoce sus habilidades, orígenes, y lo que opinan otros usuarios del mar.
            </p>


            {/* Grid de frutas */}
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
