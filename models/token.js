const moongose = require("mongoose");

const TokenSchema = moongose.Schema({
   usuarioId: {
    type: moongose.Schema.Types.ObjectId,
    require: true,
    ref: "users",
    unique: true
   },
   token: {
    type: String,
    required: true
   },
   create_at: {
    type: Date,
    default: Date.now,
    expires: 3600
   }
})

module.exports = moongose.model("Token", TokenSchema)