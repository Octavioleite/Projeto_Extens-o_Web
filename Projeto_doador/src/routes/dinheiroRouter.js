const express = require('express');
const router = express.Router();
const dinheiroController = require('../controller/dinheiroController');
const LoginController = require('../controller/loginController');


router.get('/doadorDinheiro', LoginController.verificarAutenticacao, dinheiroController.dinheiroView);
router.post('/doadorDinheiro',LoginController.verificarAutenticacao,dinheiroController.adicionarDinheiro);




module.exports = router;