const errorHandler = (err, req, res, next) => {

    res.status(err.statusCode).json({
        status: err.statusCode,
        mensaje: err.message
    });
};

module.exports = errorHandler;