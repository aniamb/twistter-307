const mongoose = require("mongoose");

let User = new mongoose.Schema({
  name: String,
  email: String
});

var userModel = mongoose.model('User', User);
module.exports = userModel;
