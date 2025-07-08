const Fruta = require('../models/frutas');

// Agregar comentario a una fruta
exports.agregarComentario = async (req, res) => {
    try {
        const frutaId = req.params.id;
        const { texto } = req.body;

        const fruta = await Fruta.findById(frutaId);
        if (!fruta) {
            return res.status(404).json({ msg: 'Fruta no encontrada' });
        }

        const nuevoComentario = {
            texto,
            autor: req.user.id,
            fecha: new Date()
        };

        fruta.comentarios.push(nuevoComentario);
        await fruta.save();

        res.status(201).json({
            msg: 'Comentario agregado correctamente',
            comentario: nuevoComentario
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al agregar comentario', error });
    }
};

// Obtener comentarios de una fruta
exports.obtenerComentarios = async (req, res) => {
    try {
        const frutaId = req.params.id;

        const fruta = await Fruta.findById(frutaId)
            .populate('comentarios.autor', 'nombre email');

        if (!fruta) {
            return res.status(404).json({ msg: 'Fruta no encontrada' });
        }

        res.status(200).json(fruta.comentarios);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener comentarios', error });
    }
};
