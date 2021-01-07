/** @format */

const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admins",
  },

  BookTitle: {
    type: String,
    required: true,
  },
  Bookhphoto: {
    type: String,
    required: true,
  },

  BookDescription: {
    type: String,
    required: true,
  },

  BookLink: {
    type: String,
    required: true,
  },
});


module.exports = Book = mongoose.model("book", BookSchema);
