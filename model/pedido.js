module.exports = {
    obtener: function (conexion, funcion) {
        conexion.query("SELECT p.id, p.direccion, p.fecha, p.precio,p.idEstadoPago,p.idEstadoEnvio,p.comentario, c.nombre as cliente FROM pedido p INNER JOIN cliente c ON c.id = p.idCliente", funcion);
    },
    insertar: function (conexion, datos, funcion) {

        conexion.query("INSERT INTO pedido( direccion, fecha, idCliente, precio, idEstadoPago, idEstadoEnvio, comentario) VALUES (?,NOW(),?,?,1,1,?)", [datos.direccion, datos.clientRadio, datos.totalPrice, datos.txtArea],funcion);
    },
    
    

}