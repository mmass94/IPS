/** @format */

const mongoose = require("mongoose");
const VideoSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admins",
  },

  VideoLink: {
    type: String,
    required: true,
  },

  VideoTitle: {
    type: String,
    required: true,
  },

  VideoSummary: {
    type: String,
    required: true,
  },

  VideoPublishDate: {
    type: Date,
    required: false,
  },
});

module.exports = Video = mongoose.model("video", VideoSchema);
