const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  login: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  registerDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Users", UserSchema);
