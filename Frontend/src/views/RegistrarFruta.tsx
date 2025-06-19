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
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0] || null;

    if (!archivo) return;

    // Validar extensión
    if (archivo.type !== "image/png") {
      setMensaje("❌ Solo se permiten imágenes en formato PNG.");
      return;
    }

    // Validar dimensiones
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        if (img.width > 250 || img.height > 250) {
          setMensaje("❌ La imagen no debe superar los 250x250 píxeles.");
          setForm({ ...form, imagen: null });
        } else {
          setForm({ ...form, imagen: archivo });
          setMensaje(""); // limpiar mensaje si todo está bien
        }
      };
      if (typeof event.target?.result === "string") {
        img.src = event.target.result;
      }
    };

    reader.readAsDataURL(archivo);
  };

  const handleSubmit = () => {
    if (!form.nombre || !form.descripcion || !form.tipo || !form.imagen) {
      setMensaje("⚠️ Por favor completa todos los campos y sube una imagen válida.");
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

            <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
            >
              <option value="">Selecciona un tipo de fruta</option>
              <option value="Paramecia">Paramecia</option>
              <option value="Zoan">Zoan</option>
              <option value="Logia">Logia</option>
            </select>


            <input
                type="file"
                accept="image/png"
                onChange={handleFileChange}
            />

            <button onClick={handleSubmit}>Subir Fruta</button>
          </div>
        </div>
      </div>
  );
};
