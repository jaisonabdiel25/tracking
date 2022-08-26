/*
    Ruta: /api/users
*/
const { check } = require('express-validator');
const { Router } = require('express');
const { getUsers, newUser, updateUser } = require('../controllers/users');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getUsers);
router.post(
	'/',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('password', 'El password es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		validarCampos,
		validarJWT,
	],
	newUser
);
router.put(
	'/:id',
	[
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		validarCampos,
		validarJWT,
	],
	updateUser
);

module.exports = router;
