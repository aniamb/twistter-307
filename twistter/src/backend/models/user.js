const mongoose = require("mongoose");

let User = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  passwordConfirm: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true
  }
});

var userModel = mongoose.model('User', User);
module.exports = userModel;
