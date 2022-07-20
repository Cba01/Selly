var conexion = require('../config/conexion');
var analitica = require("../model/analitica");

module.exports = {
    index: function (req, res) {
        analitica.obtenerIngresosTotal(conexion, function (err, ingresos) {
        analitica.obtenerPedidosPendientes(conexion, function (err, pedidosPendientes) {
        analitica.obtenerProductoMasVendido(conexion, function (error, productoVendido) {
        analitica.obtenerPedidosTotal(conexion,function(err, pedidosTotal) {
        analitica.obtenerPedidosDia(conexion,function(err, pedidosDia){
        analitica.obtenerPedidosMes(conexion,function(err, pedidosMes){
        analitica.obtenerProductosTop(conexion,function(err, productosTop){
        analitica.obtenerIngresosMes(conexion,function(err, ingresosMes){
        analitica.obtenerIngresosMesPasado(conexion,function(err, ingresosMesPasado){
        analitica.obtenerProductoMenosVendido(conexion,function(err, productoMenosVendido){
                const datoMes = JSON.stringify(pedidosMes);
                const strProductosTop= JSON.stringify(productosTop);
                res.render('analitica', {productoMenosVendido:productoMenosVendido[0],ingresosMes:ingresosMes[0], ingresosMesPasado:ingresosMesPasado[0], strProductosTop: strProductosTop,
                    datoMes: datoMes ,pedidosDia: pedidosDia, pedidosMes:pedidosMes,pedidosTotal:pedidosTotal[0] ,
                    ingresos: ingresos[0], pedidosPendientes: pedidosPendientes[0], productoVendido: productoVendido[0]});
        });
        });
        });
        });
        });
        });
        });
        });
        });
        });
    },
}