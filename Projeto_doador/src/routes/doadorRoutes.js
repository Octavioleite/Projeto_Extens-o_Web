const express = require('express');
const router = express.Router();
const doadorController = require('../controller/doadorController');
const LoginController = require('../controller/loginController');

router.get('/HomePageDoador',LoginController.verificarAutenticacao, doadorController.HomePageDoadorView)

module.exports = router;