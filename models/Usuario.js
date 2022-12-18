const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Ingrese un nombre']
    },
    apellido: {
        type: String,
        required: [true, 'Ingrese un apellido']
    },
    userName: {
        type: String,
        required: [true, 'Ingrese un username']
    },
    email: {
        type: String,
        required: [true, 'Ingrese un email'],
        unique: true,
        match: [
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
            'Tipo de correo no valido'
        ]
    },
    password: {
        type: String,
        required: [true, 'Ingrese un password'],
        minLength: [6, 'Contraseña minimo de 6 caracteres'],
        select: false
    }
});

// Metodo que se va a disparar antes de que se inserte el registro
UsuarioSchema.pre('save', async function(next){
    // Numero de interacciones para generar la cadena de encriptacion
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UsuarioSchema.methods.crearJsonWebToken = function(){
    // Payload del jwt
    return jwt.sign({ username: this.userName, email: this.email }, process.env.JWT_SECRET_WORD, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

UsuarioSchema.methods.validarPassword = async function(passwordUsuario){
    return await bcrypt.compare(passwordUsuario, this.password); // bool
}

module.exports = mongoose.model('Usuario', UsuarioSchema);