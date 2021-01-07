/** @format */

const mongoose = require("mongoose");
const Questionschema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admins",
  },

  QString: {
    type: String,
    required: true,
  },
  Answer: {
    type: String,
    required: true,
  },
});

module.exports = Question = mongoose.model("question", Questionschema);
