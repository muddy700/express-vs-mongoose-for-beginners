const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: { type: Number, required: true },
  title: String,
  content: String,
}, {versionKey: false});

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
