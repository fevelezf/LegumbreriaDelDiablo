const mongoose = require('mongoose');

const FrutaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
        enum: ['Logia', 'Paramecia', 'Zoan'],
    },
    descripcion: {
        type: String,
        required: true,
    },
    historia: {
        type: String,
    },
    imagen: {
        type: String, // ruta del archivo en /uploads
    },
    calificaciones: {
        type: [Number], // array de números (1 a 5)
        default: [],
    },
    comentarios: [
        {
            texto: { type: String, required: true },
            rating: { type: Number, required: true },
            autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
            fecha: { type: Date, default: Date.now }
        },
    ],
});

module.exports = mongoose.model('Fruta', FrutaSchema);
