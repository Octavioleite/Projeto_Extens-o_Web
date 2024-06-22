const express = require('express');
const router = express.Router();
const MeuperfilController = require('../controller/MeuperfilController');
const LoginController = require('../controller/loginController');

router.get('/Meuperfil', LoginController.verificarAutenticacao, MeuperfilController.MeuperfilView);
router.post('/Meuperfil', MeuperfilController.atualizarPerfil);

module.exports = router;
