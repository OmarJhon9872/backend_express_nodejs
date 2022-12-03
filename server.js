const dotenv = require('dotenv');
const express = require('express');
//Dependencia middleware
const morgan = require('morgan');

const libro = require('./rutas/libro');

dotenv.config({path: './config/config.env'});

const app = express();

// const logger = (req, res, next) => {
//     console.log("Request pasando por middleware");
//     next();
// };
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//Url generico, objeto instancias
app.use('/api/libro', libro);




const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Serviodor en: ", process.env.NODE_ENV));