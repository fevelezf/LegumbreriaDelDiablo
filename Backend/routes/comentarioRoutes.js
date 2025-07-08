const express = require('express');
const router = express.Router({ mergeParams: true });
const {
    agregarComentario,
    obtenerComentarios
} = require('../controllers/comentarioController');

const auth = require('../middlewares/authMiddleware');

// Listar comentarios de una fruta
router.get('/', obtenerComentarios);

// Agregar comentario a una fruta
router.post('/', auth, agregarComentario);

module.exports = router;
