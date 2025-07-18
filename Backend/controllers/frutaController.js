const Fruta = require('../models/frutas'); // o el nombre correcto del modelo

// Obtener TODAS las frutas
exports.getFrutas = async (req, res) => {
    try {
        const frutas = await Fruta.find();
        res.json(frutas);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener frutas', error });
    }
};

// Obtener UNA fruta por ID (ESTO FALTABA)
exports.getFrutaById = async (req, res) => {
    try {
        const fruta = await Fruta.findById(req.params.id)
            .populate('comentarios.autor', 'username email');

        if (!fruta) {
            return res.status(404).json({ msg: 'Fruta no encontrada' });
        }

        res.json(fruta);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener fruta', error });
    }
};

// Crear fruta (tú ya lo tienes)
exports.crearFruta = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ msg: 'No autorizado' });

        const { nombre, descripcion, tipo } = req.body;
        const imagen = req.file?.filename || "";

        const fruta = new Fruta({
            nombre,
            descripcion,
            tipo,
            imagen
        });

        await fruta.save();
        res.status(201).json(fruta);
    } catch (error) {
        console.error("Error al crear fruta:", error);
        res.status(500).json({ msg: 'Error al crear fruta', error });
    }
};

// Actualizar fruta (opcional)
exports.actualizarFruta = async (req, res) => {
    try {
        const { nombre, descripcion, tipo } = req.body;
        const imagen = req.file?.filename;

        const frutaActualizada = await Fruta.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, tipo, ...(imagen && { imagen }) },
            { new: true }
        );

        if (!frutaActualizada) return res.status(404).json({ msg: 'Fruta no encontrada' });
        res.json(frutaActualizada);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar fruta', error });
    }
};

// Eliminar fruta (opcional)
exports.eliminarFruta = async (req, res) => {
    try {
        const fruta = await Fruta.findByIdAndDelete(req.params.id);
        if (!fruta) return res.status(404).json({ msg: 'Fruta no encontrada' });
        res.status(200).json({ msg: 'Fruta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar fruta', error });
    }
};

exports.agregarComentario = async (req, res) => {
    try {
        const frutaId = req.params.id;
        const { texto, rating } = req.body; 

        const fruta = await Fruta.findById(frutaId);
        if (!fruta) {
            return res.status(404).json({ msg: 'Fruta no encontrada' });
        }

        const nuevoComentario = {
            texto,
            rating,
            autor: req.user.id,
            fecha: new Date()
        };

        fruta.comentarios.push(nuevoComentario);
        fruta.calificaciones.push(rating);

        await fruta.save();

        const frutaActualizada = await Fruta.findById(frutaId)
            .populate('comentarios.autor', 'username email');

        res.status(201).json(frutaActualizada);
    } catch (error) {
        res.status(500).json({ msg: 'Error al agregar comentario', error });
    }
};

