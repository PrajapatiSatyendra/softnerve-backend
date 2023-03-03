const { default: mongoose } = require("mongoose");
const { Schema } = require("mongoose");

const postSchema = new Schema({
  name: String,
  email: String,
  phoneNumber:String,
  address: String,
  pinCode: Number,
});

module.exports = mongoose.model("patient", postSchema);
