const express = require('express');
const router = express.Router();
const {
    getFrutas,
    getFrutaById,
    crearFruta,
    actualizarFruta,
    eliminarFruta
} = require('../controllers/frutaController');

const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const upload = require('../middlewares/multerMiddleware');

// Públicas
router.get('/', getFrutas);
router.get('/:id', getFrutaById);

// Protegidas
router.post('/', auth, upload.single('imagen'), crearFruta);
router.put('/:id', auth, upload.single('imagen'), actualizarFruta);
router.delete('/:id', auth, role('admin'), eliminarFruta);

module.exports = router;
