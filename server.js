const dotenv = require('dotenv');
const express = require('express');
// Middleware que transforma errores a 500 y json 
const errorHandler = require('./middleware/error');
//Dependencia middleware
const morgan = require('morgan');
// Cors
const cors = require('cors');
// Mongose ODM Object Data Modeling
const connectDatabase = require('./config/db')

// Primero se configura todo antes de empezar a declarar rutas y demas
dotenv.config({path: './config/config.env'});

connectDatabase();

const libro = require('./rutas/libro');
const autor = require('./rutas/autor');
const usuario = require('./rutas/usuario');
const pageNotFound = require('./rutas/404');

const app = express();
app.use(express.json());
app.use(cors());


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}


// Listado de rutas de la app
//Url generico, objeto instancias
app.use('/api/libro', libro);
app.use('/api/libreriaAutor', autor);
app.use('/usuario', usuario);
app.use('*', pageNotFound);

// Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT, 
    console.log("Serviodor en: ", process.env.NODE_ENV)
);

process.on('unhandledRejection', (error, promise) => {
    console.log(error.message);
    server.close(() => process.exit(1));
});