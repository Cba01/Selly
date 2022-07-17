var express = require('express');
const pedidoController = require('../controllers/pedidoController');
var router = express.Router();
const productosController = require("../controllers/productosController");


/* GET home page. */
router.get('/', pedidoController.lista);
router.post('/eliminar/:id', pedidoController.eliminar);


module.exports = router;
