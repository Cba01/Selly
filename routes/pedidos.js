var express = require('express');
const pedidoController = require('../controllers/pedidoController');
var router = express.Router();
const productosController = require("../controllers/productosController");


/* GET home page. */
router.get('/', pedidoController.lista);
router.post('/eliminar/:id', pedidoController.eliminar);
router.get('/detalle/:id',pedidoController.detalle);
router.get('/editarProductos/:id',pedidoController.editarProductos);
router.get('/editarDatos/:id',pedidoController.editarDatos);
router.post('/editarDatos/cliente',pedidoController.guardarClienteDatos);
router.post('/actualizarProductos',pedidoController.actualizarProductos);
router.post('/actualizarDatos',pedidoController.actualizarDatos);


module.exports = router;
