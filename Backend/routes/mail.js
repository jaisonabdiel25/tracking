/*
    Ruta: /api/mail
*/

const { Router } = require('express');
const { sendMail } = require('../controllers/mail');

const router = Router();

router.post('/', sendMail);

module.exports = router;
