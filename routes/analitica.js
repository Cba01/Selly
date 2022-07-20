var express = require('express');
var router = express.Router();
const analiticaController = require('../controllers/analiticaController');



/* GET home page. */
router.get('/', analiticaController.index );

module.exports = router;
