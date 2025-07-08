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
        const fruta = await Fruta.findById(req.params.id);
        if (!fruta) return res.status(404).json({ msg: 'Fruta no encontrada' });
        res.json(fruta);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener la fruta', error });
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
        res.json({ msg: 'Fruta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar fruta', error });
    }
};
