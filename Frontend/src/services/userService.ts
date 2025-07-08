import api from './api';

// Definir el tipo de Usuario
export type Usuario = {
    username: string;
    email: string;
    role: 'admin' | 'usuario';
};

// Función para obtener todos los usuarios
export const getUsuarios = async (): Promise<Usuario[]> => {
    const res = await api.get<Usuario[]>('/users');
    return res.data;
};
