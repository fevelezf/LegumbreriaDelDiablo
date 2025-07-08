const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// Solo admins pueden ver todos los usuarios
router.get('/', auth, role('admin'), getUsers);

module.exports = router;
