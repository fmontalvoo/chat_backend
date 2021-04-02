const { Router } = require('express');
const router = Router();

const { getChat } = require('../controllers/chat');

const { validateJWT } = require('../middleware/validate.jwt');

router.get('/:from', validateJWT, getChat);

module.exports = router;