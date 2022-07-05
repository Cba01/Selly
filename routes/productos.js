var express = require('express');
var router = express.Router();
const productosController = require("../controllers/productosController");

var multer = require('multer');

var fecha = Date.now();
var rutaAlmacen = multer.diskStorage(
    {
        destination: function (request, file, callback) {
            callback(null, './public/images/');
        },
        filename: function (request, file, callback) {
            console.log(file);
            callback(null, fecha + "_" + file.originalname);
        }
    }

);
var cargar = multer({ storage: rutaAlmacen });

/* GET home page. */
router.get('/', productosController.index);

router.post('/',cargar.single("imagen"), productosController.guardar);
router.post('/eliminar/:id',productosController.eliminar);
router.get('/editar/:id',productosController.editar);
router.post('/actualizar',cargar.single("imagen"), productosController.actualizar);



module.exports = router;
