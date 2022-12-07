const moongose = require("mongoose");

const TokenSchema = moongose.Schema({
   userId: {
    type: moongose.Schema.Types.ObjectId,
    require: true,
    ref: "user",
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