const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    texto: { type: String, required: true },
    rating: { type: Number, required: true },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fecha: { type: Date, default: Date.now }
});

const frutaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    tipo: { type: String, required: true },
    descripcion: String,
    historia: String,
    imagen: String,
    calificaciones: [Number],
    comentarios: [comentarioSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Fruta', frutaSchema);
