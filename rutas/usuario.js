const express = require("express");

const ruta = express.Router();

const {
  login,
  getUsuario,
  registrarUsuario,
} = require("./../controllers/usuario");


ruta.get('/', getUsuario)
ruta.post('/registrar', registrarUsuario);
ruta.post('/login', login);

module.exports = ruta;