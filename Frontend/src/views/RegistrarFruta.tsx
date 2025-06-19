import { useState } from "react";
import "../styles/RegistrarFruta.css";

// Estructura base para agregar una nueva fruta
export const RegistrarFruta: React.FC = () => {
    // Estado del formulario
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        tipo: "",
        imagen: null as File | null,
    });

    const [mensaje, setMensaje] = useState("");

    // Manejar cambios en inputs de texto
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Manejar archivo de imagen
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const archivo = e.target.files?.[0] || null;
        setForm({ ...form, imagen: archivo });
    };

    // Simulación de envío
    const handleSubmit = () => {
        if (!form.nombre || !form.descripcion || !form.tipo || !form.imagen) {
            setMensaje("Por favor completa todos los campos.");
            return;
        }

        // Simular subida de fruta
        console.log("Fruta registrada:", form);
        setMensaje("🍇 Fruta registrada exitosamente.");

        // Reiniciar formulario
        setForm({
            nombre: "",
            descripcion: "",
            tipo: "",
            imagen: null,
        });
    };

    return (
        <div className="registrar-fruta-container">
            <h2>Registrar una nueva Fruta del Diablo</h2>

            {mensaje && <p className="mensaje">{mensaje}</p>}

            <input
                type="text"
                name="nombre"
                placeholder="Nombre de la fruta"
                value={form.nombre}
                onChange={handleChange}
            />

            <textarea
                name="descripcion"
                placeholder="Descripción de los efectos"
                value={form.descripcion}
                onChange={handleChange}
            ></textarea>

            <input
                type="text"
                name="tipo"
                placeholder="Tipo de fruta (Logia, Paramecia, Zoan)"
                value={form.tipo}
                onChange={handleChange}
            />

            <input
                type="file"
                accept="image/png, image/jpeg, image/gif"
                onChange={handleFileChange}
            />

            <button onClick={handleSubmit}>Subir Fruta</button>
        </div>
    );
};
