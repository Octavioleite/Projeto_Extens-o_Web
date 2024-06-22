const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const loginController = require('../controller/loginController');
const listUserController = require('../controller/listUserController');

router.get('/listUser', loginController.verificarAutenticacao, listUserController.listUserView);
router.post('/listUser', loginController.verificarAutenticacao, listUserController.handleUserAction);
router.get('/sairAdmin', adminController.sairAdmin); 

module.exports = router;
