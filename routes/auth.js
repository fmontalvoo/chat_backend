const { Router } = require('express');
const router = Router();

const { create } = require('../controllers/auth');

router.post('/signup', create);

module.exports = router;