const Fruta = require('../models/frutas');
const User = require('../models/User');

// Agregar comentario a una fruta
exports.agregarComentario = async (req, res) => {
    try {
        const frutaId = req.params.id;
        const { texto, rating } = req.body;

        // Verificar existencia de fruta
        const fruta = await Fruta.findById(frutaId);
        if (!fruta) {
            return res.status(404).json({ msg: 'Fruta no encontrada' });
        }

        // Agregar comentario con autor autenticado
        const nuevoComentario = {
            texto,
            autor: req.user._id,
            fecha: new Date()
        };
        fruta.comentarios.push(nuevoComentario);

        // Agregar calificación si es válida
        if (typeof rating === 'number' && rating >= 1 && rating <= 5) {
            fruta.calificaciones.push(rating);
        }

        await fruta.save();

        // Obtener fruta actualizada con comentarios poblados
        const frutaActualizada = await Fruta.findById(frutaId)
            .populate('comentarios.autor', 'username email');

        res.status(201).json(frutaActualizada);

        res.status(201).json({
            msg: 'Comentario y calificación agregados',
            fruta: frutaActualizada
        });
    } catch (error) {
        console.error("Error al agregar comentario:", error);
        res.status(500).json({ msg: 'Error del servidor', error });
    }
};

// Obtener comentarios de una fruta
exports.obtenerComentarios = async (req, res) => {
    try {
        const frutaId = req.params.id;

        const fruta = await Fruta.findById(frutaId)
            .populate('comentarios.autor', 'username email');

        if (!fruta) {
            return res.status(404).json({ msg: 'Fruta no encontrada' });
        }

        res.status(200).json(fruta.comentarios);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener comentarios', error });
    }
};
