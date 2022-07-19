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
             res.redirect('/clientes');

        });
    },
    eliminar: function (req, res) {
        cliente.borrar(conexion, req.params.id, function (err) {
            res.redirect('/clientes');
        })
    },
    editar: function (req, res) {
        cliente.obtenerClienteID(conexion, req.params.id, function (err,datos) {
            const telefonoCliente = datos[0].telefono.toString();
            console.log(telefonoCliente)
            res.render('editarCliente',{datos: datos[0], telefono: telefonoCliente});
        })
    },
    actualizar: function (req, res) {
        cliente.actualizar(conexion, req.body, function (err,datos) {
            res.redirect('/clientes');
        })
    },
}