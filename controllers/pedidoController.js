var conexion = require('../config/conexion');
var producto = require("../model/producto");
var pedido = require("../model/pedido");
var cliente = require("../model/cliente");

var borrar = require("fs");

module.exports = {

    index: function (req, res) {

        producto.obtener(conexion, function (err, datos) {
            res.render('crearPedido', { title: 'Express', productos: datos, n: 1 });
        });
    },
    confirmarPedido: function (req, res) {
        const datos = req.body;
        const pedido = JSON.parse(datos.datosPedido);
        const strPedido = datos.datosPedido;
        const totalPrice = datos.pedidoTotal;
        cliente.obtener(conexion, function (err, datos) {
            res.render('confirmarPedido', { pedido: pedido, strPedido: strPedido, cliente: datos, totalPrice: totalPrice });
        });
    },
    guardar: function (req, res) {
        console.log("------------Controller Guardar-------------");
        pedido.insertar(conexion, req.body, function (err, datos) {
             res.redirect('/');
            console.log("____________________" + datos.insertId);

        });


    },
    lista: function (req, res) {
        pedido.obtener(conexion, function (err, datos) {
            res.render('pedidos', {pedidos: datos});
        });
    },

}