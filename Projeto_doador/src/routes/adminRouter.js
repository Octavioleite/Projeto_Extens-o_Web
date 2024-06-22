const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const loginController = require('../controller/loginController');

router.get('/admin', loginController.verificarAutenticacao, adminController.adminView);
router.get('/sairAdmin', adminController.sairAdmin); 

module.exports = router;
