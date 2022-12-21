const moongose = require("mongoose");

const UserSchema = moongose.Schema({
   nombre: String,
   apellido: String,
   email: {
    type: String,
    required: true,
    unique: true //Esto es para evitar que se duplique otro usuario con el mismo email.
   },
   edad: Number,
   password: String,
   role: String,
   avatar : String,
   carrito : Array,
   active:{
      type: Boolean,
      default: false
   }
})


module.exports = moongose.model("Users", UserSchema)
