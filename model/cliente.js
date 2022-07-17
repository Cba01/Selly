module.exports = {
    obtener: function (conexion, funcion) {
        conexion.query("SELECT * FROM cliente", funcion);
    },
    insertar: function (conexion, datos, funcion) {

        conexion.query("INSERT INTO cliente(nombre,telefono) VALUES (?,?)", [datos.clientName, datos.clientPhone],funcion);
    },
    borrar: function (conexion, id, funcion) {
        conexion.query('DELETE FROM cliente WHERE id=?', [id], funcion);

    },
}