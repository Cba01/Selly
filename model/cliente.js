module.exports = {
    obtener: function (conexion, funcion) {
        conexion.query("SELECT * FROM cliente", funcion);
    },
}