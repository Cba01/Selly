var conexion = require('../config/conexion');
var producto = require("../model/producto");
var borrar = require("fs");

module.exports = {

    index: function (req, res) {

        producto.obtener(conexion, function (err, datos) {
            console.log(datos);


            res.render('crearPedido', { title: 'Express', productos: datos, n: 1 });


        });
    },
    
}