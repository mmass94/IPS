/** @format */

const mongoose = require("mongoose");
const ArticleSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admins",
  },

  ArticleTitle: {
    type: String,
    required: true,
  },
  Articlephoto: {
    type: String,
    required: true,
  },

  ArticleAuthor: {
    type: String,
    required: true,
  },

  ArticleSource: {
    type: String,
    required: true,
  },

  ArticleOverview: {
    type: String,
    required: true,
  },

  Articlephoto: {
    type: String,
    required: true,
  },

  Articledetails: {
    type: String,
    required: true,
  },

  ArticlePublishDate: {
    type: String,
    required: true,
  },
});

module.exports = Article = mongoose.model("article", ArticleSchema);
