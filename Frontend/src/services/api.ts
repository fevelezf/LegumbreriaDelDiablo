import axios from 'axios';
import type { AxiosInstance } from 'axios';


// Crear instancia de Axios configurada
const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Asegúrate que coincida con tu backend
    headers: {
        'Content-Type': 'application/json'
    }
});

// Agregar token automáticamente a cada request si existe en localStorage
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
