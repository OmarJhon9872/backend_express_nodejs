exports.getLibros = (req, res, next) => {
    res.status(200).json({status: 200, mensaje: "Se proceso bien"});
};

exports.getLibro = (req, res, next) => {
    res.status(200).json({status: 200, mensaje: "Libro por id"});
};

exports.crearLibro = (req, res, next) => {
    res.status(200).json({status: 200, mensaje: "Se creo libro"});
};

exports.actualizarLibro = (req, res, next) => {
    res.status(200).json({status: 200, mensaje: "Se actualizo libro"});
};

exports.eliminarLibro = (req, res, next) => {
    res.status(200).json({status: 200, mensaje: "Se elimino libro"});
};