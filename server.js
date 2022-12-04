const dotenv = require('dotenv');
const express = require('express');
// Middleware que transforma errores a 500 y json 
const errorHandler = require('./middleware/error');
//Dependencia middleware
const morgan = require('morgan');
// Mongose ODM Object Data Modeling
const connectDatabase = require('./config/db')

// Primero se configura todo antes de empezar a declarar rutas y demas
dotenv.config({path: './config/config.env'});

connectDatabase();

const libro = require('./rutas/libro');
const autor = require('./rutas/autor');

const app = express();
app.use(express.json());

// const logger = (req, res, next) => {
//     console.log("Request pasando por middleware");
//     next();
// };
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Listado de rutas de la app
//Url generico, objeto instancias
app.use('/api/libro', libro);
app.use('/api/libreriaAutor', autor);

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