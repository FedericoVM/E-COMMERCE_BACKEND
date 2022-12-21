const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const conectarDB = require('./database');
require("dotenv").config();
const AuthRoutes = require("./routers/auth");
const ProductosAdmin = require("./routers/productos");
const PagosControllers = require('./routers/pago')
const mercadoPago = require("mercadopago");

mercadoPago.configure({
    access_token: process.env.MERCADOPAGO_TOKEN
})

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

conectarDB();


// Ruta para usuarios y productos (Realizar CRUD) 
app.use('/api/users', AuthRoutes)
app.use('/api/productos', ProductosAdmin)

app.use('/api', PagosControllers)
// Autentificar el usuario
//app.use('/api/auth')



const PUERTO = 4123;

app.listen(PUERTO, ()=> {
    console.log(`El servidor esta escuchando en el puerto  ${PUERTO}`)
})