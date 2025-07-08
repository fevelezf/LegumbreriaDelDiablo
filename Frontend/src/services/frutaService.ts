import api from './api';


// Tipo para una fruta (ajustado a tu modelo)
export type Fruta = {
    _id?: string; // MongoDB ID opcional
    id: string;
    nombre: string;
    tipo: string;
    descripcion?: string;
    historia?: string;
    imagen?: string;
    calificaciones?: number[];
    comentarios?: Comentario[];
};


// Obtener todas las frutas
export const getFrutas = async (): Promise<Fruta[]> => {
    const res = await api.get('/frutas');
    return res.data;
};

// Obtener fruta por ID
export const getFrutaById = async (id: string): Promise<Fruta> => {
    const res = await api.get(`/frutas/${id}`);
    return res.data;
};

export const crearFruta = async (formData: FormData): Promise<Fruta> => {
    const token = localStorage.getItem("token");
    const res = await api.post('/frutas', formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
};

// Editar fruta
export const actualizarFruta = async (id: string, formData: FormData): Promise<Fruta> => {
    const token = localStorage.getItem("token");
    const res = await api.put(`/frutas/${id}`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
};

// Eliminar fruta (solo admin)
export const eliminarFruta = async (id: string): Promise<{ msg: string }> => {
    const token = localStorage.getItem("token");
    const res = await api.delete(`/frutas/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};

// Tipo de comentario
export type Comentario = {
    usuario: string;
    texto: string;
    rating: number;
};

// Enviar comentario a fruta específica
export const crearComentario = async (id: string, comentario: Comentario) => {
    const res = await api.post(`/frutas/${id}/comentarios`, comentario);
    return res.data;
};

