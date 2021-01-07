/** @format */

const mongoose = require("mongoose");
const ResearchSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admins",
  },

  ResearchTitle: {
    type: String,
    required: true,
  },
  Researchphoto: {
    type: String,
    required: true,
  },

  ResearchOverview: {
    type: String,
    required: true,
  },

  Researchdetails: {
    type: String,
    required: true,
  },
  ResearchPublishDate: {
    type: String,
    required: true,
  },
});

module.exports = Research = mongoose.model("research", ResearchSchema);
