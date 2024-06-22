const express = require('express');
const router = express.Router();
const cadastroController = require('../controller/cadastroController');

router.get('/cadastro', cadastroController.cadastroView);
router.post('/cadastro', cadastroController.cadastrarUsuario);

module.exports = router;