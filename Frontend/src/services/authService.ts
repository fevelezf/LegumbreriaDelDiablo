import api from './api';

export type LoginPayload = {
    email: string;
    password: string;
};

export type RegisterPayload = {
    username: string;
    email: string;
    password: string;
    role?: 'admin' | 'usuario';
};

// Este tipo debe reflejar exactamente lo que tu backend devuelve tras login o registro
export type AuthResponse = {
    token: string;
    username: string;
    email: string;
    role: 'admin' | 'usuario';
    msg?: string;
};

// Iniciar sesión
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/auth/login', payload);
    return res.data;
};

// Registrar usuario
export const register = async (datos: RegisterPayload): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/auth/register', datos);
    return res.data;
};
