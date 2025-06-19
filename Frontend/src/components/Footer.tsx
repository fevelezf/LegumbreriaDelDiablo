// src/components/Footer.tsx

import "../styles/Footer.css";

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} La Legumbrería del Diablo 🍇. Todos los derechos infernales reservados.</p>
        </footer>
    );
};
