const { Router } = require('express');
const router = Router();

const { getUsers } = require('../controllers/users');
const { validateJWT } = require('../middleware/validate.jwt');



router.get('/', validateJWT, getUsers);

module.exports = router;