/*
    Ruta: /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { loginUser } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
	'/',
	[check('email', 'El email es obligatorio').isEmail(), check('password', 'El password es obligatorio').not().isEmpty(), validarCampos],
	loginUser
);

module.exports = router;
