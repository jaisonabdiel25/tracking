/*
    Ruta: /api/orders
*/
const { check } = require('express-validator');
const { Router } = require('express');
const { getOrders, newOrder, updateOrder, receiveOrderPlace } = require('../controllers/order');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getOrders);
router.post(
	'/',
	[
		check('tracking', 'El tracking es obligatorio').not().isEmpty(),
		check('client', 'El cliente es obligatorio').not().isEmpty(),
		validarCampos,
		validarJWT,
	],
	newOrder
);
router.post(
	'/receiveOrder',
	[check('tracking', 'El tracking es obligatorio').not().isEmpty(), validarCampos, validarJWT],
	receiveOrderPlace
);
router.put(
	'/:id',
	[
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		validarCampos,
		validarJWT,
	],
	updateOrder
);

module.exports = router;
