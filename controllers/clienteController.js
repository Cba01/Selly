var conexion = require('../config/conexion');
var cliente = require("../model/cliente");
var borrar = require("fs");

module.exports = {
    index: function (req, res) {
        cliente.obtener(conexion, function (err, datos) {
            res.render('clientes', {clientes: datos});
        });
    },
    guardar: function (req, res) {
        cliente.insertar(conexion, req.body, function (err, datos) {
             res.redirect('/');

        });


    },
}