const express = require('express');
const router = express.Router();
const { getUsers, eliminarUsuario } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

router.get('/', auth, role('admin'), getUsers);
router.delete('/:id', auth, role('admin'), eliminarUsuario);

module.exports = router;
