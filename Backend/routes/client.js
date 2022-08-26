/*
    Ruta: /api/client
*/
const { check } = require('express-validator');
const { Router } = require('express');
const { getClient, newClient, updateClient } = require('../controllers/client');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getClient);
router.post(
	'/',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('code', 'El codigo es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		validarCampos,
		validarJWT,
	],
	newClient
);
router.put(
	'/:id',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('code', 'El codigo es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		validarCampos,
		validarJWT,
	],
	updateClient
);

module.exports = router;
