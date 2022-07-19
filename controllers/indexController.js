var conexion = require('../config/conexion');
var analitica = require("../model/analitica");

module.exports = {
    index: function (req, res) {
        analitica.obtenerIngresosTotal(conexion, function (err, ingresos) {
        analitica.obtenerPedidosPendientes(conexion, function (err, pedidosPendientes) {
        analitica.obtenerPedidosRecientes(conexion, function (err, pedidosRecientes) {
        analitica.obtenerProductosRecientes(conexion, function (err, productosRecientes) {
        analitica.obtenerProductoMasVendido(conexion, function (error, productoVendido) {
        analitica.obtenerPedidosTotal(conexion,function(err, pedidosTotal) {
        res.render('index', {pedidosTotal:pedidosTotal[0] ,ingresos: ingresos[0], pedidosPendientes: pedidosPendientes[0], pedidosRecientes: pedidosRecientes, productosRecientes: productosRecientes, productoVendido: productoVendido[0]});

        });

        });
        });
        });
        });
        });
    },
}