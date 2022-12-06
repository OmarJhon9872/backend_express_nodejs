const ErrorResponse = require("../helper/errorResponse");
const Libro = require("./../models/Libro");

exports.getLibros = async (req, res, next) => {
    try{
        const libroLista = await Libro.find();

        res.status(200).json(libroLista);
    }catch(err){
        next(new ErrorResponse("No se pudo obtener los libros: "+err.message, 400));
    }
};

exports.getLibroById = async (req, res, next) => {
    try{        
        const libroId = await Libro.findById(req.params.id);

        if(!libroId){

            return next(new ErrorResponse("No se encontro el libro", 404));
        }
        res.status(200).json(libroId);
    }catch(err){
        
        next(new ErrorResponse("No se pudo obtener el libro: "+err.message, 404));
    }
};

exports.crearLibro = async (req, res, next) => {
    try{
        const libroUnique = await Libro.create(req.body);

        res.status(200).json({
            status: 200,
            data: libroUnique
        });
    }catch(err){
        next(new ErrorResponse("No se pudo procesar el request: "+err.message, 500));
    }
};

exports.updateLibro = async (req, res, next) => {
    try{
        const libroUnique = await Libro.findByIdAndUpdate(req.params.id, req.body);

        res.status(200).json({
            status: 200,
            data: libroUnique
        });
    }catch(err){
        next(new ErrorResponse("No se pudo procesar el request: "+err.message, 500));
    }
};

exports.deleteLibro = async (req, res, next) => {
    try{
        const libroUnique = await Libro.findByIdAndDelete(req.params.id, req.body);

        if(!libroUnique){
            return next(new ErrorResponse("No se encontro el libro: "+req.params.id, 404));
        }

        res.status(200).json({
            status: 200
        });
    }catch(err){
        next(new ErrorResponse("No se pudo procesar el request: "+err.message, 500));
    }
};

exports.pagination = async (req, res, next) => {
    try{
        // Nombre columna ordenar
        const sort = req.body.sort;
        const sortDirection = req.body.sortDirection;
        const page = parseInt(req.body.page);
        const pageSize = parseInt(req.body.pageSize);

        let filterValor = "";
        let filterPropiedad = "";

        let libros = [];
        let totalRows = 0;

        // Se enviara por request lo siguiente
        // FilterValor = {valor: "", propiedad: ""};
        if(req.body.filterValue){

            filterValor = req.body.filterValue.valor;
            filterPropiedad = req.body.filterValue.propiedad;
            
            // i define que no importa si es mayuscula o minuscula
            libros = await Libro.find({
                [filterPropiedad]: new RegExp(filterValor, "i")
            }).sort({[sort]: sortDirection})
            .skip( (page-1) * pageSize )
            .limit(pageSize);

            totalRows = await Libro.find({
                [filterPropiedad]: new RegExp(filterValor, "i")
            }).count();

        }else{
            libros = await Libro
                        .find()
                        .sort({[sort]: sortDirection})
                        .skip( (page-1) * pageSize )
                        .limit(pageSize);

            totalRows = await Libro.count();
        }
        const pagesQuantity = Math.ceil(totalRows / pageSize);

        res.status(200).json({
            status: 200,
            pageSize,
            page,
            sort,
            sortDirection,
            pagesQuantity,
            totalRows,
            data: libros
        });

    }catch(err){
        next(new ErrorResponse("No se pudo procesar el request: "+err.message, 501));
    }
}