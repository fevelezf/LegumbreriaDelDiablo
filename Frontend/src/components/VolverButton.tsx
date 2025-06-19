// src/components/VolverButton.tsx

import { useNavigate } from "react-router-dom";
import "../styles/VolverButton.css";

type VolverButtonProps = {
  ruta?: string; // Si no se pasa, vuelve a la anterior
};

export const VolverButton: React.FC<VolverButtonProps> = ({ ruta }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (ruta) {
      navigate(ruta);
    } else {
      navigate(-1); // Volver a la página anterior
    }
  };

  return (
    <button className="btn-volver" onClick={handleClick}>
      ⬅ Volver
    </button>
  );
};
