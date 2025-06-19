import { useState } from "react";
import "../styles/RegistrarFruta.css";
import frutaImage from "../assets/RegistrarFruta.png";

export const RegistrarFruta: React.FC = () => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    tipo: "",
    imagen: null as File | null,
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0] || null;
    setForm({ ...form, imagen: archivo });
  };

  const handleSubmit = () => {
    if (!form.nombre || !form.descripcion || !form.tipo || !form.imagen) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    console.log("Fruta registrada:", form);
    setMensaje("🍇 Fruta registrada exitosamente.");

    setForm({
      nombre: "",
      descripcion: "",
      tipo: "",
      imagen: null,
    });
  };

  return (
    <div className="registrar-wrapper">
      {/* Columna izquierda: imagen */}
      <div className="registrar-image">
        <img src={frutaImage} alt="Fruta decorativa" />
      </div>

      {/* Columna derecha: formulario */}
      <div className="registrar-form-container">
        <div className="registrar-form-content">
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
      </div>
    </div>
  );
};
