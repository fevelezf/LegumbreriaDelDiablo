const User = require('../models/User');

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener usuarios', error });
    }
};

// Eliminar un usuario por ID
exports.eliminarUsuario = async (req, res) => {
    try {
        const usuario = await User.findByIdAndDelete(req.params.id);
        if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });
        res.status(200).json({ msg: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar usuario', error });
    }
};
