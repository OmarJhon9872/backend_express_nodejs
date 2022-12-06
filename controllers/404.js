const ErrorResponse = require("../helper/errorResponse");

exports.pageNotFound = (req, res, next) => {
    
    res.status(404).json({
        status: 404,
        method: req.method,
        message: "No encontre la pagina deseada"
    });

    // next(new ErrorResponse("No encontre la pagina deseada", 404));
}