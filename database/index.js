const mongoose = require('mongoose');

const conectarDB = async () => {

        try {

            await mongoose.connect(process.env.URL_CONECTION_DATABASE), {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            };

            console.log('Base de datos conectada');
        
        } catch (error) {
            console.log(error);
            process.exit(1);
        }

}

module.exports = conectarDB