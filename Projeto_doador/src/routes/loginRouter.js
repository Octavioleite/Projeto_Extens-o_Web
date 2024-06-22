const express = require('express');
const router = express.Router();
const LoginController = require('../controller/loginController');

router.get('/', LoginController.loginView);
router.post('/', LoginController.autenticar); 
router.get('/sair', LoginController.sair); 

module.exports = router;
