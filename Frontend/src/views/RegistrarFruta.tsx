import { useState } from "react";
import "../styles/RegistrarFruta.css";
import frutaImage from "../assets/RegistrarFruta.png";
import { crearFruta } from "../services/frutaService";

export const RegistrarFruta: React.FC = () => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    tipo: "",
    imagen: null as File | null,
  });

  const [mensaje, setMensaje] = useState("");
  const [esExito, setEsExito] = useState(false); // <- nuevo estado

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0] || null;

    if (!archivo) return;

    if (archivo.type !== "image/png") {
      setMensaje("❌ Solo se permiten imágenes en formato PNG.");
      setEsExito(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        if (img.width > 250 || img.height > 250) {
          setMensaje("❌ La imagen no debe superar los 250x250 píxeles.");
          setEsExito(false);
          setForm({ ...form, imagen: null });
        } else {
          setForm({ ...form, imagen: archivo });
          setMensaje("");
        }
      };
      if (typeof event.target?.result === "string") {
        img.src = event.target.result;
      }
    };

    reader.readAsDataURL(archivo);
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.descripcion || !form.tipo || !form.imagen) {
      setMensaje("⚠️ Por favor completa todos los campos y sube una imagen válida.");
      setEsExito(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nombre", form.nombre);
      formData.append("descripcion", form.descripcion);
      formData.append("tipo", form.tipo);
      formData.append("imagen", form.imagen);

      await crearFruta(formData);

      setMensaje("🍇 Fruta registrada exitosamente.");
      setEsExito(true); // <- marcar como éxito
      setForm({
        nombre: "",
        descripcion: "",
        tipo: "",
        imagen: null,
      });
    } catch (error) {
      console.error("Error al registrar fruta:", error);
      setMensaje("❌ Ocurrió un error al registrar la fruta.");
      setEsExito(false); // <- marcar como error
    }
  };

  return (
      <div className="registrar-wrapper">
        <div className="registrar-image">
          <img src={frutaImage} alt="Fruta decorativa" />
        </div>

        <div className="registrar-form-container">
          <div className="registrar-form-content">
            <h2>Registrar una nueva Fruta del Diablo</h2>

            {/* Mostrar mensaje con clase dinámica */}
            {mensaje && (
                <p className={esExito ? "mensaje-exito" : "mensaje-error"}>
                  {mensaje}
                </p>
            )}

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

            <select name="tipo" value={form.tipo} onChange={handleChange}>
              <option value="">Selecciona un tipo de fruta</option>
              <option value="Paramecia">Paramecia</option>
              <option value="Zoan">Zoan</option>
              <option value="Logia">Logia</option>
            </select>

            <input type="file" accept="image/png" onChange={handleFileChange} />

            <button onClick={handleSubmit}>Subir Fruta</button>
          </div>
        </div>
      </div>
  );
};
