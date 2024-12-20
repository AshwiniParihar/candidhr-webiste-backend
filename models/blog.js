const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  content: {
    type: String,
    default: "", 
  },
  bannerImage: {
    type: String,
    default: "", 
  },
  title: {
    type: String,
    default: "", 
  },
  tag: {
    type: String,
    default: "", 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

module.exports = mongoose.model("Blog", blogSchema);
