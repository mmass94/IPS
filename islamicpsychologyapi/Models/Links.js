/** @format */

const mongoose = require("mongoose");
const LinkSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admins",
  },

  LinkString: {
    type: String,
    required: true,
  },
  LinkDiscription: {
    type: String,
    required: true,
  },
});

module.exports = Link = mongoose.model("link", LinkSchema);
