const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors");
const conectarDB = require('./database')
require("dotenv").config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

conectarDB();


// Ruta para usuarios y productos (Realizar CRUD) 
app.use('/api/users' )
app.use('/api/products')


// Autentificar el usuario
app.use('/api/auth')



const PUERTO = 4000;

app.listen(PUERTO, ()=> {
    console.log(`El servidor esta escuchando en el puerto  ${PUERTO}`)
})