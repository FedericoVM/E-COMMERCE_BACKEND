const moongose = require("mongoose");

const UserSchema = moongose.Schema({
   name: String,
   lastname: String,
   email: {
    type: String,
    required: true,
    unique: true //Esto es para evitar que se duplique otro usuario con el mismo email.
   },
   age: Number,
   password: String,
   role: String,
   avatar : String,
   cloudinary_id : String,
   active:{
      type: Boolean,
      default: false
   }
})


module.exports = moongose.model("User", UserSchema)
