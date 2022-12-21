const express = require("express");
const authController = require("../controllers/authControllers");
const router = express.Router();

router.get('/obtener-usuarios', authController.getUsuarios);
router.post('/registrar-usuario', authController.registrarUsuario);
router.post('/logear-usuario', authController.loginUsuario);
router.get('/:id/verificar/:token', authController.verificarToken)
module.exports = router
