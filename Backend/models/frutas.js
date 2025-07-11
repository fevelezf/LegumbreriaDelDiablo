const mongoose = require('mongoose');

// Esquema de un comentario
const comentarioSchema = new mongoose.Schema({
    texto: {
        type: String,
        required: true
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Relación con el modelo de usuario
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
}, { _id: true });

// Esquema de fruta
const frutaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    tipo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    historia: {
        type: String
    },
    imagen: {
        type: String // ejemplo: "gomu.png"
    },
    calificaciones: {
        type: [Number],
        default: []
    },
    comentarios: {
        type: [comentarioSchema],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Fruta', frutaSchema);
