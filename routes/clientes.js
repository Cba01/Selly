var express = require('express');
const pedidoController = require('../controllers/pedidoController');
const clienteController = require('../controllers/clienteController');
var router = express.Router();
const productosController = require("../controllers/productosController");


/* GET home page. */
router.get('/', clienteController.index);


module.exports = router;
