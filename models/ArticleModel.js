const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: String,
  link: String,
  team_abbreviation: String,
  image_url: String,
  date_posted: Date,
});

const ArticleModel = mongoose.model("Article", ArticleSchema);

module.exports = ArticleModel;
