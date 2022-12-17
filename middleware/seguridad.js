const ErrorResponse = require("../helper/errorResponse");
const jwt = require('jsonwebtoken');
const Usuario = require("./../models/Usuario");

exports.seguridad = async (req, res, next) => {

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next(
            new ErrorResponse("Cliente sin token, middleware", 400)
        );
    }

    try{
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET_WORD);

        const usuarioDB = await Usuario.findOne({userName: tokenDecoded.username });

        req.usuario = usuarioDB;

        next();

    }catch(err){
        return next(
            new ErrorResponse("Errores en procesamiento token", 400)
        );
    }

}