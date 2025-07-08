const express = require('express');
const cors = require('cors');
require('dotenv').config();

const createConnection = require('./db/db');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const frutaRoutes = require('./routes/frutaRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes');

(async () => {
    const app = express();
    const PORT = process.env.PORT || 5000;

    // Middlewares globales
    app.use(cors());
    app.use(express.json()); // Parsear JSON
    app.use('/uploads', express.static('uploads')); // Servir imágenes

    // Conexión a la base de datos
    const connection = await createConnection();
    app.set('dbConnection', connection); // opcional

    // Rutas API
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/frutas', frutaRoutes);
    app.use('/api/frutas/:id/comentarios', comentarioRoutes);

    // Ruta base
    app.get('/', (req, res) => {
        res.send('Backend funcionando bien ');
    });

    // Iniciar servidor
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})();
