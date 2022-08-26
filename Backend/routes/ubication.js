/*
    Ruta: /api/ubication
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getUbications, newUbication, updateUbication } = require('../controllers/ubication');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getUbications);
router.post('/', [check('name', 'El nombre de la ubicacion es obligatorio').not().isEmpty(), validarCampos, validarJWT], newUbication);
router.put('/', validarJWT, updateUbication);

module.exports = router;
