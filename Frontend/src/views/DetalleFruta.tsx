// Importo lo necesario
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/DetalleFruta.css";
import gomuImg from "../assets/gomu.jpeg";
import meraImg from "../assets/mera.jpg";
import opeImg from "../assets/opeope.jpeg";

// Defino tipos
type Comentario = {
    usuario: string;
    texto: string;
    rating: number;
};

type Fruta = {
    id: string;
    nombre: string;
    tipo: string;
    descripcion: string;
    historia?: string;
    imagen: string;
};

// Componente principal
export const DetalleFruta: React.FC = () => {
    // Obtengo el ID desde la URL
    const { id } = useParams();

    // Estado para la fruta específica
    const [fruta, setFruta] = useState<Fruta | null>(null);

    // Estado para comentarios
    const [comentarios, setComentarios] = useState<Comentario[]>([]);

    // Estado para el nuevo comentario
    const [nuevoComentario, setNuevoComentario] = useState({
        usuario: "",
        texto: "",
        rating: 5,
    });

    // Simulación de carga de datos
    useEffect(() => {
        // Datos simulados
        const frutasDB: Fruta[] = [
            {
                id: "1",
                nombre: "Gomu Gomu no Mi",
                tipo: "Paramecia",
                descripcion: "Convierte al usuario en goma.",
                historia: "Encontrada por Shanks y consumida por Luffy.",
                imagen: gomuImg,
            },
            {
                id: "2",
                nombre: "Mera Mera no Mi",
                tipo: "Logia",
                descripcion: "Permite convertirse en fuego.",
                historia: "Perteneció a Portgas D. Ace.",
                imagen: meraImg,
            },
            {
                id: "3",
                nombre: "Ope ope no Mi",
                tipo: "Logia",
                descripcion: "Permite al usuario crear una sala en la que puede manipular todo a su antojo.",
                historia: "Perteneció a  Trafalgar D. Law.",
                imagen: opeImg,
            },
        ];

        // Busco la fruta por ID
        const frutaEncontrada = frutasDB.find((f) => f.id === id);
        if (frutaEncontrada) setFruta(frutaEncontrada);

        // Comentarios simulados
        setComentarios([
            { usuario: "Zoro", texto: "¡Muy poderosa!", rating: 5 },
            { usuario: "Nami", texto: "Algo peligrosa...", rating: 3 },
        ]);
    }, [id]);

    // Manejar envío de nuevo comentario
    const enviarComentario = () => {
        if (!nuevoComentario.usuario || !nuevoComentario.texto) return;

        setComentarios((prev) => [...prev, nuevoComentario]);
        setNuevoComentario({ usuario: "", texto: "", rating: 5 });
    };

    // Si no se encuentra la fruta
    if (!fruta) {
        return <p style={{ textAlign: "center", padding: "2rem" }}>Fruta no encontrada.</p>;
    }

    // Renderizado de la fruta
    return (
        <div className="detalle-fruta">
            <h2>{fruta.nombre}</h2>

            <div className="detalle-contenido">
                <img src={fruta.imagen} alt={fruta.nombre} />

                <div className="detalle-info">
                    <p><strong>Tipo:</strong> {fruta.tipo}</p>
                    <p><strong>Descripción:</strong> {fruta.descripcion}</p>
                    {fruta.historia && <p><strong>Historia:</strong> {fruta.historia}</p>}
                </div>
            </div>

            {/* Comentarios */}
            <div className="comentarios">
                <h3>Comentarios y Calificaciones</h3>
                {comentarios.map((c, index) => (
                    <div className="comentario" key={index}>
                        <strong>{c.usuario}</strong> - {c.rating}⭐<br />
                        <em>{c.texto}</em>
                    </div>
                ))}
            </div>

            {/* Formulario para comentar */}
            <div className="form-comentario">
                <h4>Escribe tu comentario</h4>
                <input
                    type="text"
                    placeholder="Tu nombre"
                    value={nuevoComentario.usuario}
                    onChange={(e) =>
                        setNuevoComentario({ ...nuevoComentario, usuario: e.target.value })
                    }
                />
                <textarea
                    placeholder="Tu opinión..."
                    value={nuevoComentario.texto}
                    onChange={(e) =>
                        setNuevoComentario({ ...nuevoComentario, texto: e.target.value })
                    }
                ></textarea>
                <label>
                    Calificación:
                    <select
                        value={nuevoComentario.rating}
                        onChange={(e) =>
                            setNuevoComentario({
                                ...nuevoComentario,
                                rating: parseInt(e.target.value),
                            })
                        }
                    >
                        {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </label>
                <button onClick={enviarComentario}>Publicar</button>
            </div>
        </div>
    );
};
