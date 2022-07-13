var conexion = require('../config/conexion');
var producto = require("../model/producto");
var borrar = require("fs");

module.exports = {

    index: function (req, res) {

        producto.obtener(conexion, function (err, datos) {

            res.render('productos', { title: 'Express', productos: datos, n: 1 });


        });
    },
    guardar: function (req, res) {
        console.log(req.body);
        console.log(req.file.filename);

        producto.insertar(conexion, req.body, req.file, function (err) {
            res.redirect('/productos');


        });
    },
    eliminar: function (req, res) {
        console.log("Recepcion de datos");
        console.log(req.params.id);
        producto.retornarDatosID(conexion, req.params.id, function (err, registros) {
            var nombreImagen = "public/images/" + (registros[0].imagen);
            if (borrar.existsSync(nombreImagen)) {
                borrar.unlinkSync(nombreImagen);
            }
            producto.borrar(conexion, req.params.id, function (err) {
                res.redirect('/productos');
            })
        });
    },
    editar: function (req, res) {
        producto.retornarDatosID(conexion, req.params.id, function (err, registros) {
            console.log(registros[0])
            res.render('editarProducto', { producto: registros[0] });

        });
    },
    actualizar: function name(req, res) {
        console.log(req.body.nombre);



        if (req.file) {
            if (req.file.filename) {

                producto.retornarDatosID(conexion, req.body.id, function (err, registros) {
                    var nombreImagen = "public/images/" + (registros[0].imagen);
                    if (borrar.existsSync(nombreImagen)) {
                        borrar.unlinkSync(nombreImagen);
                        console.log('nombre de la imagen: '+nombreImagen);
                    }
                    producto.actualizarArchivo(conexion,req.body,req.file,function(err){});
                });

            }
        }
        if (req.body.nombre && req.body.precio) {
            producto.actualizar(conexion, req.body, function (err) {
            });
        }
        res.redirect('/productos');

    },
    

}