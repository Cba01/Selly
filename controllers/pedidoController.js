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
            console.log(params)
            cliente.obtener(conexion, function (err, datos) {
                res.redirect('/crearPedido');
           });
        });
    },
    eliminar: function (req, res) {
        pedido.borrar(conexion, req.params.id, function (err) {
            res.redirect('/pedidos');
        })
    },
    detalle: function (req, res) {
        pedido.obtenerPedidoID(conexion, req.params.id, function (err, registro) {
            pedido.obtenerProductoID(conexion, req.params.id, function (err, datos) {
                const pedido = registro;
                res.render('pedidoDetalle', { datos: datos, pedido: pedido[0] })
            });
        });
    },
    editarProductos: function (req, res) {
        pedido.obtenerProductoID(conexion, req.params.id, function (err, registros) {
            producto.obtener(conexion, function (err, datos) {
                const pedido = registros;
                const storage = JSON.stringify(registros);
                res.render('editarPedido', { productos: datos, pedido: pedido, pedidoJSON: storage });
            });
        });
    },
    editarDatos: function (req, res) {
        pedido.obtenerPedidoID(conexion, req.params.id, function (err, registros) {
            cliente.obtener(conexion, function (err, datos) {
                const pedido = registros;
                const strPedido = JSON.stringify(registros);
                res.render('editarDatosPedido', { pedido: pedido[0], strPedido: strPedido, cliente: datos });
            });
        });
    },
    actualizarProductos: function (req, res) {
        const datos = req.body;
        conexion.query("UPDATE pedido SET precio = ? WHERE id=? ", [datos.pedidoTotal, datos.idPedido]);
        conexion.query("DELETE FROM producto_pedido WHERE idPedido = ?", [datos.idPedido]);
        const pedido = JSON.parse(datos.datosPedido);
        for (let i = 0; i < pedido.length; i++) {
            conexion.query("INSERT INTO producto_pedido(idPedido,idProducto,cantidad) VALUES (?,?,?)", [datos.idPedido, pedido[i].id, pedido[i].cantidad]);
        };
        res.redirect('/pedidos/detalle/' + datos.idPedido + "?");

    },
    actualizarDatos: function (req, res) {
        const datos = req.body;
        pedido.actualizar(conexion, datos, function (err) {
                  res.redirect('/pedidos/detalle/'+req.body.idPedido)
            
        });

    },
    guardarClienteDatos: function (req, res) {
        const params = req.body
        const pedido = JSON.parse(params.strPedido);
        cliente.insertar(conexion, req.body, function (err) {
            console.log("ENTRO AL GUARDAR CLIENTE DATOS")
            cliente.obtener(conexion, function (err, datos) {
                  res.redirect('/pedidos/editarDatos/'+pedido[0].idPedido)
            });
        });
    },


}