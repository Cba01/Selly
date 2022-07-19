var express = require('express');
const pedidoController = require('../controllers/pedidoController');
const clienteController = require('../controllers/clienteController');
var router = express.Router();
const productosController = require("../controllers/productosController");


/* GET home page. */
router.get('/', clienteController.index);
router.post('/', clienteController.guardar);
router.get('/editar/:id', clienteController.editar);
router.post('/eliminar/:id', clienteController.eliminar);
router.post('/actualizar', clienteController.actualizar);



module.exports = router;
