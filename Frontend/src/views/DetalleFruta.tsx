import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/DetalleFruta.css";
import frutasData from "../data/frutas.json";
import { VolverButton } from "../components/VolverButton"; // ✅ botón de volver

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

export const DetalleFruta: React.FC = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [fruta, setFruta] = useState<Fruta | null>(null);
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [nuevoComentario, setNuevoComentario] = useState({
        texto: "",
        rating: 5,
    });

    useEffect(() => {
        const frutaEncontrada = frutasData.find((f) => f.id === id);
        if (frutaEncontrada) {
            setFruta(frutaEncontrada);
            setComentarios([
                { usuario: "Zoro", texto: "¡Poder brutal!", rating: 5 },
                { usuario: "Nami", texto: "Me da miedo 😅", rating: 3 },
            ]);
        }
    }, [id]);

    const enviarComentario = () => {
        if (!nuevoComentario.texto.trim()) return;

        const comentario: Comentario = {
            usuario: user?.username || "Anónimo",
            texto: nuevoComentario.texto,
            rating: nuevoComentario.rating,
        };

        setComentarios((prev) => [...prev, comentario]);
        setNuevoComentario({ texto: "", rating: 5 });
    };

    if (!fruta) {
        return <p style={{ textAlign: "center", padding: "2rem" }}>Fruta no encontrada.</p>;
    }

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

            <div className="comentarios">
                <h3>Experiencias y Opiniones</h3>
                {comentarios.map((c, i) => (
                    <div key={i} className="comentario">
                        <strong>{c.usuario}</strong> - {c.rating}⭐<br />
                        <em>{c.texto}</em>
                    </div>
                ))}
            </div>

            {user ? (
                <div className="form-comentario">
                    <h4>¿Has probado esta fruta? Cuéntanos qué piensas</h4>

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
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </label>

                    <button onClick={enviarComentario}>Publicar</button>
                </div>
            ) : (
                <p className="login-requerido">
                    🔒 Debes <Link to="/login">iniciar sesión</Link> para comentar esta fruta.
                </p>
            )}

            {/* ✅ Botón de volver al catálogo */}
            <VolverButton ruta="/catalogo" />
        </div>
    );
};
