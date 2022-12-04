const ErrorResponse = require('./../helper/errorResponse');
const Autor = require('./../models/Autor');

// Para que express pueda procesar un json
// como response hay que configurar en server.js
// la linea 
//      #app.use(express.json());
exports.crearAutor = async (req, res, next) => {
    try{
        // Mongoose funciones
        const autorData = await Autor.create(req.body);
        res.status(200).json({
            status: 200,
            data: autorData
        });
    }catch(err){
        next(new ErrorResponse("No se pudo crear el autor"+ err.message, 500));
    }
};

exports.getAutor = async (req, res, next) => {
    try{
        // Mongoose funciones
        const autorList = await Autor.find();
        res.status(200).json(autorList);
    }catch(err){
        next(new ErrorResponse("No es posible recuperar los autores", 500));
    }
};

exports.getAutorById = async (req, res, next) => {
    try{
        // Mongoose funciones
        const autor = await Autor.findById(req.params.id);

        if(!autor){
            return next(new ErrorResponse("El auto no existe en db con el id: "+ req.params.id, 404));
        }

        res.status(200).json(autor);
    }catch(err){
        // Si hay un error la funcion mandara el error al middleware
        next(new ErrorResponse("El auto no existe con el id: "+ req.params.id, 404));
    }
};

exports.updateAutor = async (req, res, next) => {
    try{
        // Mongoose funciones
        // Recibe id y data json a actualizar
        const autor = await Autor.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        if(!autor){
            return next(new ErrorResponse("No se encontro autor update: "+ req.params.id, 404));
        }

        res.status(200).json({status:200, data: autor});
    }catch(err){
        next(new ErrorResponse("No es posible actualizar al autor: "+ err.message, 404));
    }
};

exports.deleteAutor = async (req, res, next) => {
    try{
        // Mongoose funciones
        // Recibe id y data json a actualizar
        const autor = await Autor.findByIdAndDelete(
            req.params.id
        );

        if(!autor){
            return next(new ErrorResponse("No se encontro autor delete: "+ req.params.id, 404));
        }

        res.status(200).json({status:200});
    }catch(err){
        next(new ErrorResponse("No se pudo eliminar autor: "+ err.message, 500));
    }
};