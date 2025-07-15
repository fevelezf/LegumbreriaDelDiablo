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

        // Crear el nuevo comentario
        const nuevoComentario = {
            texto,
            rating,
            autor: req.user.id,
            fecha: new Date()
        };

        fruta.comentarios.push(nuevoComentario);

        // Agregar calificación si es válida
        if (typeof rating === 'number' && rating >= 1 && rating <= 5) {
            fruta.calificaciones.push(rating);
        }

        // Guardar fruta con el nuevo comentario
        await fruta.save();

        // Recargar fruta con comentarios actualizados y poblados
        const frutaActualizada = await Fruta.findById(frutaId)
            .populate('comentarios.autor', 'username email');

        return res.status(201).json({
            msg: 'Comentario y calificación agregados correctamente',
            fruta: frutaActualizada
        });

    } catch (error) {
        console.error("Error al agregar comentario:", error);
        return res.status(500).json({ msg: 'Error del servidor', error });
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

        const comentarios = fruta.comentarios || [];

        return res.status(200).json(comentarios);
    } catch (error) {
        console.error("Error al obtener comentarios:", error);
        return res.status(500).json({ msg: 'Error al obtener comentarios', error });
    }
};
