const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { signup, signin, renewJWT } = require('../controllers/auth');
const { validateParams } = require('../middleware/validate.params');
const { validateJWT } = require('../middleware/validate.jwt');

router.post('/signup', [
    check('name', "El nombre es obligatorio").notEmpty(),
    check('email', "Verifique su email").normalizeEmail().isEmail(),
    check('password', "Debe ingresar una contraseña").exists(),
    validateParams
], signup);

router.post('/signin', [
    check('email', "Verifique su email").normalizeEmail().isEmail(),
    check('password', "Verifique su contraseña").exists(),
    validateParams
], signin);

router.get('/renew', validateJWT, renewJWT);

module.exports = router;