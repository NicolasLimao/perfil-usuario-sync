const express = require('express');
const userController = require('../controllers/userController.js');
const router = express.Router();
const upload = require('../config/multerConfig.js');

router.get('/usuario', userController.getUsuario);
router.post('/usuario', upload.single('imagem_perfil'), userController.updateUsuario);


module.exports = router;