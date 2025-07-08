const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) return res.status(400).json({ msg: 'El usuario ya existe' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const nuevoUsuario = await User.create({
            username,
            email,
            password: hashedPassword
        });

        const token = generarToken(nuevoUsuario._id);

        res.status(201).json({
            msg: 'Usuario registrado',
            token,
            username: nuevoUsuario.username,
            email: nuevoUsuario.email,
            role: nuevoUsuario.role
        });
    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({ msg: 'Error al registrar usuario', error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await User.findOne({ email });
        if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });

        const passwordOk = await bcrypt.compare(password, usuario.password);
        if (!passwordOk) return res.status(401).json({ msg: 'Credenciales incorrectas' });

        const token = generarToken(usuario._id);

        res.status(200).json({
            msg: 'Login exitoso',
            token,
            username: usuario.username,
            email: usuario.email,
            role: usuario.role
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al iniciar sesión', error });
    }
};
