var express = require('express');
const crearPedidoController = require('../controllers/crearPedidoController');
var router = express.Router();
const productosController = require("../controllers/productosController");


/* GET home page. */
router.get('/', crearPedidoController.index);

module.exports = router;
