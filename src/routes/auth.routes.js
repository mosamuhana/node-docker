const { Router } = require('express');

const { signUp, login } = require('../controllers/auth.controller');

const router = Router();

router.route('/signup').post(signUp);

router.route('/login').post(login);

module.exports = router;
