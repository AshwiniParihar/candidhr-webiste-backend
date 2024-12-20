const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  content: {
    type: String,
    required: false, // Content is optional
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation time
  },
});

module.exports = mongoose.model("Blog", blogSchema);
