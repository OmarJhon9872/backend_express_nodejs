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
        res.status(400).json({status: 400, data: err});
    }
};

exports.getAutor = async (req, res, next) => {
    try{
        // Mongoose funciones
        const autorList = await Autor.find();
        res.status(200).json(autorList);
    }catch(err){
        res.status(400).json({status: 400, data: err});
    }
};

exports.getAutorById = async (req, res, next) => {
    try{
        // Mongoose funciones
        const autor = await Autor.findById(req.params.id);
        res.status(200).json(autor);
    }catch(err){
        res.status(400).json({status: 400, data: err});
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
            res.status(400).json({status: 400});
        }

        res.status(200).json({status:200, data: autor});
    }catch(err){
        res.status(400).json({status: 400, data: err});
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
            res.status(404).json({status: 404});
        }

        res.status(200).json({status:200});
    }catch(err){
        res.status(400).json({status: 400, data: err});
    }
};