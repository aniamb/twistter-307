const mongoose = require("mongoose");

let Microblog = new mongoose.Schema({
  username: String,
  postBody: String,
  likes: Number,
  quoteCount: Number,
  topics: [String],
  likedUsers: [String],
  quotedUsers: [String]
});

var microblogModel = mongoose.model('Microblog', Microblog);
module.exports = microblogModel;