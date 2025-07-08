const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    texto: {
        type: String,
        required: true
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
}, { _id: true });

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
        type: String // Ejemplo: "/gomu.png" o URL
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
