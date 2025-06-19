import { useNavigate } from "react-router-dom";
import "../styles/VolverButton.css";

type VolverButtonProps = {
  ruta?: string; // Si no se pasa, va atrás
};

export const VolverButton: React.FC<VolverButtonProps> = ({ ruta }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (ruta) {
      navigate(ruta);
    } else {
      navigate(-1);
    }
  };

  return (
      <div className="volver-wrapper">
        <button className="btn-volver" onClick={handleClick}>
          ⬅ Volver
        </button>
      </div>
  );
};
