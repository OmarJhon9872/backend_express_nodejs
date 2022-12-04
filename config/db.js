const mongoose = require('mongoose');

// Por defecto mongoose creara la base de datos si no existe en el servidor
const connectDatabase = async () => {
    // La conexion a la base es asincrona por lo que se debera usar promesa
    const conexion = await mongoose.connect(process.env.MONGO_URI, {
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
        // useUnifiedTopology: true
    });

    console.log("Servidor mongo conectado: "+conexion.connection.host);
};

module.exports = connectDatabase;