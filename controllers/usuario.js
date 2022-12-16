const ErrorResponse = require("./../helper/errorResponse");
const Usuario = require("./../models/Usuario");

exports.registrarUsuario = async (req, res, next) => {
  try {
    const { nombre, apellido, username, email, password } = req.body;
    const userDB = await Usuario.create({
      nombre,
      userName: username,
      apellido,
      email,
      password,
    });

    const token = userDB.crearJsonWebToken();

    res.status(201).json({
      status: 201,
      id: userDB._id,
      nombre,
      apellido,
      username,
      email,
      token,
    });
  } catch (err) {
    next(new ErrorResponse("Error registrando usuario: " + err, 400));
  }
};

exports.login = async (req, res, next) => {

    try{

    
        const { email, password } = req.body;

        if (!email || !password) {
            return next(
                new ErrorResponse("Ingrese email y password", 400)
            );
        }

        //Como esta oculto se forza a seleccionar el password
        const usuarioBD = await Usuario.findOne({email}).select('+password');

        if(!usuarioBD){
            return next(
                new ErrorResponse("Usuario no existe", 400)
            );
        }

        const comprobacion = await usuarioBD.validarPassword(password);

        if(!comprobacion){
            return next(
                new ErrorResponse("Credenciales incorrectas", 400)
            );
        }

        const token = usuarioBD.crearJsonWebToken();

        res.status(200).json({
            status: 200,
            id: usuarioBD._id,
            nombre: usuarioBD.nombre,
            apellido: usuarioBD.apellido,
            username: usuarioBD.userName,
            email: usuarioBD.email,
            token,
        });
    }catch(err){
        next(new ErrorResponse("Error en login: " + err, 400));
    }
};

exports.getUsuario = (req, res, next) => {
  res.status(200).json({
    status: 200,
  });
};
