import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { Catalogo } from "./views/Catalogo";
import { DetalleFruta } from "./views/DetalleFruta";
import { BuscarFruta } from "./views/BuscarFruta";
import { RegistrarFruta } from "./views/RegistrarFruta";
import { AdminPanel } from "./views/AdminPanel";
import { NotFound } from "./views/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { Tyc } from "./views/Tyc";

import "./App.css";

export const App: React.FC = () => {
    return (
        <AuthProvider>
            <div className="app-container">
                <Navbar />
                <main className="main-container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/catalogo" element={<Catalogo />} />
                        <Route path="/detalle/:id" element={<DetalleFruta />} />
                        <Route path="/terminos" element={<Tyc />} />
                        <Route path="/buscar" element={<BuscarFruta />} />
                        <Route
                            path="/registrar"
                            element={
                                <ProtectedRoute allowedRoles={["usuario", "admin"]}>
                                    <RegistrarFruta />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute allowedRoles={["admin"]}>
                                    <AdminPanel />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </AuthProvider>
    );
};
