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
    obtenerProductoMenosVendido: function (conexion, funcion) {
        conexion.query("SELECT p.idProducto,pr.nombre , pr.imagen , SUM(p.cantidad) as cantidad FROM `producto_pedido` p INNER JOIN producto pr ON pr.id = p.idProducto GROUP BY idProducto ORDER BY cantidad ASC LIMIT 1;", funcion);
    },

    //QUERYS PARA LOS GRAFICOS
    obtenerPedidosMes: function (conexion, funcion) {
        conexion.query("SELECT m.month, m.number, DATE_FORMAT(p.fecha, '%M', 'es_ES') as mesNombre, DATE_FORMAT(p.fecha, '%m') as mes ,DATE_FORMAT(p.fecha, '%d/%m/%Y')as fecha,COUNT(*) as pedidos ,SUM(case when p.idEstadoPago = '2' then p.precio end) as ingresosMes FROM ( SELECT 'January' AS MONTH, 1 as number UNION SELECT 'February' AS MONTH, 2 as number UNION SELECT 'March' AS MONTH, 3 as number UNION SELECT 'April' AS MONTH, 4 as number UNION SELECT 'May' AS MONTH, 5 as number UNION SELECT 'June' AS MONTH, 6 as number UNION SELECT 'July' AS MONTH, 7 as number UNION SELECT 'August' AS MONTH, 8 as number UNION SELECT 'September' AS MONTH, 9 as number UNION SELECT 'October' AS MONTH, 10 as number UNION SELECT 'November' AS MONTH, 11 as number UNION SELECT 'December' AS MONTH, 12 as number ) AS m LEFT JOIN pedido p ON m.month = DATE_FORMAT(p.fecha, '%M') GROUP BY m.month ORDER BY `m`.`number` ASC", funcion);
    },
    obtenerPedidosDia: function (conexion, funcion) {
        conexion.query("SELECT DATE_FORMAT(p.fecha, '%d') as dia ,DATE_FORMAT(p.fecha, '%d/%m/%Y')as fecha,COUNT(*) as pedidos ,SUM(case when p.idEstadoPago = '2' then p.precio end) as ingresosDia FROM `pedido` p WHERE DATE_FORMAT(p.fecha, '%m')=MONTH(NOW()) GROUP BY DATE_FORMAT(p.fecha, '%d');", funcion);
    },
    obtenerProductosTop: function (conexion, funcion) {
        conexion.query("SELECT p.idProducto,pr.nombre,pr.imagen , SUM(p.cantidad) as cantidad FROM `producto_pedido` p INNER JOIN producto pr ON pr.id = p.idProducto GROUP BY idProducto ORDER BY cantidad DESC LIMIT 10;", funcion);
    },
    obtenerIngresosMes: function (conexion, funcion) {
        conexion.query("SELECT SUM(p.precio) as ingresos FROM `pedido` p WHERE p.idEstadoPago = 2 and MONTH(p.fecha)=MONTH(NOW()) GROUP BY p.idEstadoPago;", funcion);
    },
    obtenerIngresosMesPasado: function (conexion, funcion) {
        conexion.query("SELECT SUM(p.precio) as ingresos FROM `pedido` p WHERE p.idEstadoPago = 2 and MONTH(p.fecha)=MONTH(CURRENT_DATE - INTERVAL 1 MONTH) GROUP BY p.idEstadoPago;", funcion);
    },


    
    

}