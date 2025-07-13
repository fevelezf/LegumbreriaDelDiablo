import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/DetalleFruta.css";
import { VolverButton } from "../components/VolverButton";
import { getFrutaById, crearComentario } from "../services/frutaService";
import type { Fruta, Comentario } from "../services/frutaService";

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
        const cargarFruta = async () => {
            if (!id) return;

            try {
                const frutaBackend = await getFrutaById(id);
                setFruta(frutaBackend);
                setComentarios(frutaBackend.comentarios || []);
            } catch (error) {
                console.error("Error al cargar fruta", error);
            }
        };

        cargarFruta();
    }, [id]);

    const enviarComentario = async () => {
        if (!nuevoComentario.texto.trim() || !fruta?._id) return;

        const comentario = {
            texto: nuevoComentario.texto,
            rating: nuevoComentario.rating,
        };

        try {
            const actualizado = await crearComentario(fruta._id, comentario);
            setComentarios(actualizado.comentarios || []);
            setNuevoComentario({ texto: "", rating: 5 });
        } catch (error) {
            console.error("Error al comentar", error);
        }
    };

    if (!fruta) {
        return <p style={{ textAlign: "center", padding: "2rem" }}>Fruta no encontrada.</p>;
    }

    return (
        <div className="detalle-fruta">
            <h2>{fruta.nombre}</h2>

            <div className="detalle-contenido">
                <img
                    src={`http://localhost:5000/uploads/${fruta.imagen}`}
                    alt={fruta.nombre}
                />

                <div className="detalle-info">
                    <p><strong>Tipo:</strong> {fruta.tipo}</p>
                    <p><strong>Descripción:</strong> {fruta.descripcion}</p>
                    {fruta.historia && <p><strong>Historia:</strong> {fruta.historia}</p>}
                </div>
            </div>

            <div className="comentarios">
                <h3>Experiencias y Opiniones</h3>
                {comentarios.length === 0 ? (
                    <p>No hay comentarios aún.</p>
                ) : (
                    comentarios.map((c, i) => (
                        <div key={i} className="comentario">
                            <strong>{c.autor?.username || "Anónimo"}</strong> - {c.rating} ⭐<br />
                            <em>{c.texto}</em>
                        </div>
                    ))
                )}
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

            <VolverButton ruta="/catalogo" />
        </div>
    );
};
