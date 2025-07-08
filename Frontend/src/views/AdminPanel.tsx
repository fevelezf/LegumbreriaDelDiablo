import { useEffect, useState } from "react";
import "../styles/AdminPanel.css";
import { getFrutas, eliminarFruta } from "../services/frutaService";
import { getUsuarios } from "../services/userService";

// Tipos
type Fruta = {
    _id?: string; // MongoDB usa _id
    id: string;
    nombre: string;
    tipo: string;
};

type Usuario = {
    username: string;
    email: string;
    role: string;
};

export const AdminPanel: React.FC = () => {
    const [frutas, setFrutas] = useState<Fruta[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [buscarFruta, setBuscarFruta] = useState({ nombre: "", tipo: "" });
    const [buscarUsuario, setBuscarUsuario] = useState({ username: "", email: "" });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const frutasBackend = await getFrutas();
                const usuariosBackend = await getUsuarios();
                setFrutas(frutasBackend);
                setUsuarios(usuariosBackend);
            } catch (error) {
                console.error("Error al cargar datos del backend", error);
            }
        };
        cargarDatos();
    }, []);

    const eliminarFrutaSeleccionada = async () => {
        const fruta = frutas.find(
            (f) =>
                f.nombre.toLowerCase() === buscarFruta.nombre.toLowerCase() &&
                f.tipo.toLowerCase() === buscarFruta.tipo.toLowerCase()
        );

        if (!fruta) {
            alert("❌ Fruta no encontrada");
            return;
        }

        try {
            await eliminarFruta(fruta._id || fruta.id);
            setFrutas((prev) => prev.filter((f) => f._id !== fruta._id));
            alert("✅ Fruta eliminada correctamente");
        } catch (error) {
            console.error("Error al eliminar fruta", error);
            alert("❌ No se pudo eliminar la fruta");
        }
    };

    const eliminarUsuario = () => {
        alert("Eliminación real de usuarios aún no implementada 🔒");
    };

    return (
        <div className="admin-panel">
            <h2>Panel de Administrador</h2>

            {/* Eliminar fruta */}
            <div className="admin-section">
                <h3>Eliminar una fruta</h3>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={buscarFruta.nombre}
                    onChange={(e) => setBuscarFruta({ ...buscarFruta, nombre: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Tipo"
                    value={buscarFruta.tipo}
                    onChange={(e) => setBuscarFruta({ ...buscarFruta, tipo: e.target.value })}
                />
                <button className="danger-btn" onClick={eliminarFrutaSeleccionada}>
                    Enviarla al infierno
                </button>
            </div>

            {/* Eliminar usuario */}
            <div className="admin-section">
                <h3>Eliminar un usuario</h3>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={buscarUsuario.username}
                    onChange={(e) => setBuscarUsuario({ ...buscarUsuario, username: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={buscarUsuario.email}
                    onChange={(e) => setBuscarUsuario({ ...buscarUsuario, email: e.target.value })}
                />
                <button className="danger-btn" onClick={eliminarUsuario}>
                    Enviarlo al infierno
                </button>
            </div>

            {/* Ver frutas */}
            <div className="admin-section">
                <h3>Frutas registradas</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {frutas.map((f) => (
                        <tr key={f._id || f.id}>
                            <td>{f.nombre}</td>
                            <td>{f.tipo}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Ver usuarios */}
            <div className="admin-section">
                <h3>Usuarios registrados</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {usuarios.map((u) => (
                        <tr key={u.username}>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
