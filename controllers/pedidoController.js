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
        pedido.insertar(conexion, req.body, function (err, datos) {
            const pedido = JSON.parse(req.body.strPedido);
            const idPedido = datos.insertId;

            /* Insertar productos del pedido a la base de datos */
             for (let i = 0; i < pedido.length; i++) {
                conexion.query("INSERT INTO producto_pedido(idPedido,idProducto,cantidad) VALUES (?,?,?)", [idPedido, pedido[i].id, pedido[i].cantidad]);
            };
            res.redirect('/pedidos'); 
        });
    },
    lista: function (req, res) {
        pedido.obtener(conexion, function (err, datos) {
            res.render('pedidos', { pedidos: datos });
        });
    },
    guardarCliente: function (req, res) {
        const params = req.body
        const pedido = JSON.parse(params.strPedido);
        cliente.insertar(conexion, req.body, function (err) {
            console.log("ENTRO AL GUARDAR CLIENTE")
            cliente.obtener(conexion, function (err, datos) {
                res.render('confirmarPedido', { cliente: datos, strPedido: params.strPedido, totalPrice: params.totalPrice, pedido: pedido })
            });
        });
    },
    eliminar: function (req, res) {
        pedido.borrar(conexion, req.params.id, function (err) {
            res.redirect('/pedidos');
        })
    }

}