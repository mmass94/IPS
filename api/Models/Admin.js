/** @format */

const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },

  Username: {
    type: String,
    required: true,
  },

  Password: {
    type: String,
    required: true,
  },
});

module.exports = Admin = mongoose.model("admin", AdminSchema);
