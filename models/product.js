const moongose = require("mongoose");

const ProdcutsSchema = moongose.Schema({
    nombre: {
      type: String,
      require: true
    },
    precio: Number,
    codigo: {
       type: String,
       require: true,
       unique: true
    },
    categoria: String,
    descripcion: String,
    imagen: {
      type: String,
      require: true
    },
    stock : Number,
    marca : String
 })

 module.exports = moongose.model("Productos", ProdcutsSchema);