module.exports = {
    //QUERYS PARA EL INDEX
    obtenerPedidosPendientes: function (conexion, funcion) {
        conexion.query("SELECT COUNT(*) as pedidosPendientes FROM `pedido` WHERE idEstadoEnvio < 4", funcion);
    },
    obtenerIngresosTotal: function (conexion, funcion) {
        conexion.query("SELECT SUM(p.precio) as ingresos FROM `pedido` p WHERE p.idEstadoPago = 2 GROUP BY p.idEstadoPago", funcion);
    },
    obtenerPedidosRecientes: function (conexion, funcion) {
        conexion.query("SELECT p.id, p.direccion,DATE_FORMAT(p.fecha, '%H:%i %d/%m/%Y') as fecha , p.precio,p.idEstadoPago,p.idEstadoEnvio,p.comentario, c.nombre as cliente, c.telefono FROM pedido p INNER JOIN cliente c ON c.id = p.idCliente ORDER BY p.fecha DESC LIMIT 10;", funcion);
    },
    obtenerPedidosTotal: function (conexion, funcion) {
        conexion.query("SELECT COUNT(*) as pedidos FROM `pedido`;", funcion);
    },
    obtenerProductosRecientes: function (conexion, funcion) {
        conexion.query("SELECT pp.id, pp.idProducto, p.nombre, p.imagen FROM `producto_pedido` pp INNER JOIN producto p ON p.id = pp.idProducto ORDER BY id DESC LIMIT 5;", funcion);
    },
    obtenerProductoMasVendido: function (conexion, funcion) {
        conexion.query("SELECT p.idProducto,pr.nombre,pr.imagen , SUM(p.cantidad) as cantidad FROM `producto_pedido` p INNER JOIN producto pr ON pr.id = p.idProducto GROUP BY idProducto ORDER BY cantidad DESC LIMIT 1;", funcion);
    },


    
    

}