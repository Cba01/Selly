module.exports = {
    obtener: function (conexion, funcion) {
        conexion.query("SELECT * FROM producto", funcion);
    },
    insertar: function (conexion, datos, archivos, funcion) {

        conexion.query("INSERT INTO producto( nombre, precio, imagen) VALUES (?,?,?)", [datos.nombre, datos.precio, archivos.filename], funcion);
    },
    retornarDatosID: function (conexion, id, funcion) {

        conexion.query("SELECT * FROM producto WHERE id=?", [id], funcion);

    },

    borrar: function (conexion, id, funcion) {
        conexion.query('DELETE FROM producto WHERE id=?', [id], funcion);

    },
    actualizar: function (conexion, datos, funcion) {

        conexion.query("UPDATE producto SET nombre=?, precio=? WHERE id=? ",[datos.nombre, datos.precio, datos.id], funcion);
    },
    actualizarArchivo: function (conexion, datos,archivo, funcion) {

        conexion.query("UPDATE producto SET imagen=? WHERE id=? ",[archivo.filename, datos.id], funcion);
    },
    


}