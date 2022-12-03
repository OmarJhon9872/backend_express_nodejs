const express = require("express");
const ruta = express.Router();

const {
  getLibros,
  getLibro,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
} = require("./../controllers/libro");

ruta
    .route('/')
    .get(getLibros)
    .post(crearLibro);

ruta
    .route('/:id')
    .get(getLibro)
    .put(actualizarLibro)
    .delete(eliminarLibro);


module.exports = ruta;
