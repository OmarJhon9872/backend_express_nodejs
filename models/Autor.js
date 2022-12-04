const mongoose = require('mongoose');

// Se definen los esquemas para manipular la data
const AutorSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    gradoAcademico: String,
    nombreCompleto: String
});

// Nombre dentro de la base y schema de definicion
module.exports = mongoose.model('Autor', AutorSchema);