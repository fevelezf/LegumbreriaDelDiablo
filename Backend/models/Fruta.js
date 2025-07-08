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
            usuario: { type: String },
            texto: { type: String },
            rating: { type: Number, min: 1, max: 5 },
        },
    ],
});

module.exports = mongoose.model('Fruta', FrutaSchema);
