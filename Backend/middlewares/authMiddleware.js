const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    let token;

    // El token debe ir en el header: Authorization: Bearer <token>
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Buscamos el usuario y lo asignamos a req.user
            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                return res.status(404).json({ msg: 'Usuario no encontrado' });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error('Error al verificar token:', error.message);
            return res.status(401).json({ msg: 'Token inválido o expirado' });
        }
    } else {
        return res.status(401).json({ msg: 'No se recibió token de autorización' });
    }
};

module.exports = authMiddleware;
