var conexion = require('../config/conexion');
var producto = require("../model/producto");
var cliente = require("../model/cliente");

var borrar = require("fs");

module.exports = {

    index: function (req, res) {

        producto.obtener(conexion, function (err, datos) {
             console.log(datos);
            res.render('crearPedido', { title: 'Express', productos: datos, n: 1 });
        });
    },
    confirmarPedido: function (req, res) {
        console.log("----------------Entro al controller-----------------")
        const datos = req.body
        console.log(datos.datosPedido)
        const pedido = JSON.parse(datos.datosPedido)
        const totalPrice = datos.pedidoTotal
        cliente.obtener(conexion,function (err, datos){
            console.log(datos);

            res.render('confirmarPedido',{pedido: pedido, cliente: datos, totalPrice: totalPrice});
        });
    }
    
}