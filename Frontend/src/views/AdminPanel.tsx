import { useEffect, useState } from "react";
import "../styles/AdminPanel.css";
import frutasData from "../data/frutas.json";
import usuariosData from "../data/usuarios.json";

// Tipos de datos
type Fruta = {
    id: string;
    nombre: string;
    tipo: string;
};

type Usuario = {
    username: string;
    email: string;
    password: string;
    role: string;
};


export const AdminPanel: React.FC = () => {
    const [frutas, setFrutas] = useState<Fruta[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [buscarFruta, setBuscarFruta] = useState({ nombre: "", tipo: "" });
    const [buscarUsuario, setBuscarUsuario] = useState({ username: "", email: "" });

    useEffect(() => {
        // cargar desde JSON
        setFrutas(frutasData);
        setUsuarios(usuariosData);
    }, []);

    const eliminarFruta = () => {
        alert("Fruta eliminada (ojo es simulado)");
    };

    const eliminarUsuario = () => {
        alert("Usuario eliminado (ojo es simulado)");
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
                <button className="danger-btn" onClick={eliminarFruta}>
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
                <h3>Ver frutas</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {frutas.map((f) => (
                        <tr key={f.id}>
                            <td>{f.nombre}</td>
                            <td>{f.tipo}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Ver usuarios */}
            <div className="admin-section">
                <h3>Ver usuarios</h3>
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
