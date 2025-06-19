// Importo React y los hooks necesarios
import { useEffect, useState } from "react";

// Importo los estilos específicos de este panel
import "../styles/AdminPanel.css";

// Defino el tipo de dato para una fruta
type Fruta = {
    id: string;
    nombre: string;
    tipo: string;
};

// Defino el tipo de dato para un usuario
type Usuario = {
    id: string;
    nombre: string;
    email: string;
};

// Componente principal del panel de administración
export const AdminPanel: React.FC = () => {
    // Estado para almacenar frutas y usuarios (simulación de base de datos)
    const [frutas, setFrutas] = useState<Fruta[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    // Estados para los inputs de búsqueda de fruta y usuario
    const [buscarFruta, setBuscarFruta] = useState({ nombre: "", tipo: "" });
    const [buscarUsuario, setBuscarUsuario] = useState({ nombre: "", email: "" });

    // useEffect para simular la carga inicial de datos
    useEffect(() => {
        // Simulo una respuesta de la API con frutas y usuarios
        setFrutas([
            { id: "1", nombre: "Gomu Gomu no Mi", tipo: "Paramecia" },
            { id: "2", nombre: "Mera Mera no Mi", tipo: "Logia" },
        ]);

        setUsuarios([
            { id: "1", nombre: "Monkey D. Luffy", email: "luffy@onepiece.com" },
            { id: "2", nombre: "Portgas D. Ace", email: "ace@onepiece.com" },
        ]);
    }, []);

    // Función simulada para eliminar una fruta
    const eliminarFruta = () => {
        alert("Fruta eliminada (simulado).");
        // Aquí debería ir la lógica real de eliminación vía API
    };

    // Función simulada para eliminar un usuario
    const eliminarUsuario = () => {
        alert("Usuario eliminado (simulado).");
        // Aquí también iría la lógica real de eliminación
    };

    // Renderizo el panel de administrador
    return (
        <div className="admin-panel">
            <h2>Panel de Administrador</h2>

            {/* Sección para eliminar una fruta */}
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

            {/* Sección para eliminar un usuario */}
            <div className="admin-section">
                <h3>Eliminar un usuario</h3>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={buscarUsuario.nombre}
                    onChange={(e) => setBuscarUsuario({ ...buscarUsuario, nombre: e.target.value })}
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

            {/* Sección para ver todas las frutas registradas */}
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

            {/* Sección para ver todos los usuarios */}
            <div className="admin-section">
                <h3>Ver usuarios</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {usuarios.map((u) => (
                        <tr key={u.id}>
                            <td>{u.nombre}</td>
                            <td>{u.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
