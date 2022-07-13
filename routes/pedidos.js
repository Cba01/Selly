var express = require('express');
const pedidoController = require('../controllers/pedidoController');
var router = express.Router();
const productosController = require("../controllers/productosController");


/* GET home page. */
router.get('/', pedidoController.lista);


module.exports = router;
