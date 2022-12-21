const express = require("express");
const CrudProductos = require("../controllers/adminProductos");
const router = express.Router();

router.post('/crear-producto', CrudProductos.crearProducto);
router.get('/obtener-productos', CrudProductos.obtenerProductos);
router.delete('/eliminar-producto/:id', CrudProductos.eliminarProducto);
router.put('/editar-producto/:id', CrudProductos.editarProducto)
router.delete('/eliminar-usuario/:id', CrudProductos.eliminarUsuario)

module.exports = router