const express = require("express");
const ArticleModel = require("../models/ArticleModel");
const TeamModel = require("../models/TeamModel");

const Router = express.Router();

Router.route("/").get((req, res) => {
  const team = req.query.team;
  let query = ArticleModel.find({}).select(["-_id", "-__v"]);
  if (team !== undefined && team !== "") {
    query = ArticleModel.find({ team_abbreviation: team }).select([
      "-_id",
      "-__v",
    ]);
  }
  query.exec((error, docs) => {
    if (error) {
      return res
        .status(500)
        .send({ success: false, msg: "internal server error" });
    }
    res.send(docs);
  });
});

Router.route("/").post((req, res) => {
  const newArticle = new ArticleModel(req.body);
  newArticle.save((error, doc) => {
    if (error) {
      return res
        .status(500)
        .send({ success: false, msg: "internal server error" });
    }
    addToTeam(doc);
    res.send(doc);
  });
});

const addToTeam = (article) => {
  const id = article._id;
  const query = TeamModel.findOneAndUpdate(
    { team_abbreviation: article.team_abbreviation },
    { $addToSet: { articles: id } }
  );
  query.exec();
};

module.exports = Router;
