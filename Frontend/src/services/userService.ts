import api from './api';

// ✅ Tipo de Usuario con _id necesario para eliminar
export type Usuario = {
    _id: string;
    username: string;
    email: string;
    role: 'admin' | 'usuario';
};

// ✅ Obtener todos los usuarios
export const getUsuarios = async (): Promise<Usuario[]> => {
    const token = localStorage.getItem("token");

    const res = await api.get<Usuario[]>('/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};

// ✅ Eliminar usuario por ID (con token en headers)
export const eliminarUsuario = async (id: string): Promise<{ msg: string }> => {
    const token = localStorage.getItem("token");

    const res = await api.delete(`/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return res.data;
};
