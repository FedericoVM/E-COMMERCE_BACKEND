const moongose = require("mongoose");

const ProdcutsSchema = moongose.Schema({
    name: String,
    price: Number,
    productID: {
       type: String,
       require: true,
       unique: true
    },
    category: String,
    description: String,
    image: String,
    stock : Number
 })

 module.exports = moongose.model("Product", ProdcutsSchema);