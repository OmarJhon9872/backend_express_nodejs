const { Router } = require('express');
const express = require('express');
const ruta = express.Router();

const { 
    pageNotFound
} = require('./../controllers/404');

ruta
    .route('/')
    .all(pageNotFound);

module.exports = ruta;