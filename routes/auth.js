const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { create } = require('../controllers/auth');
const { validateParams } = require('../middleware/validate.params');

router.post('/signup', [
    check('name', "El nombre es obligatorio").notEmpty(),
    check('email', "Verifique su email").normalizeEmail().isEmail(),
    check('password', "Debe ingresar una contraseña").exists(),
    validateParams
], create);

module.exports = router;