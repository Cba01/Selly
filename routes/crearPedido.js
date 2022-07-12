var express = require('express');
const crearPedidoController = require('../controllers/pedidoController');
var router = express.Router();
const productosController = require("../controllers/productosController");


/* GET home page. */
router.get('/', crearPedidoController.index);
router.post('/detalles', crearPedidoController.confirmarPedido);

module.exports = router;
