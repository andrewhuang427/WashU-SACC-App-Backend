const TeamModel = require("../models/TeamModel");
const express = require("express");

const Router = express.Router();

/**
 *  Returns list of all teams or returns specific team if team abbrev. is provided
 *  Path: "/teams?team=<team_abbreviation>"
 */
Router.route("").get((req, res) => {
  const team = req.query.team;
  let query = TeamModel.find({}).select([
    "-athletes",
    "-articles",
    "-_id",
    "-__v",
  ]);
  query.exec((error, docs) => {
    if (error) {
      return res
        .status(500)
        .send({ success: false, msg: "internal server error" });
    }
    res.send(docs);
  });
});

/**
 *  Save new team
 *  Path: "/teams"
 */
Router.route("").post((req, res) => {
  const newTeam = new TeamModel(req.body);
  newTeam.save((error, doc) => {
    if (error) {
      return res
        .status(500)
        .send({ success: false, msg: "internal server error" });
    }
    res.send(doc);
  });
});

/**
 *  Returns roster of team
 *  Path: "/teams/:id/roster"
 *  id - team abbreviation
 */
Router.route("/:id/roster").get((req, res) => {
  console.log("roster route");
  const teamId = req.params.id;
  const query = TeamModel.findOne({ team_abbreviation: teamId })
    .select(["-_id", "-__v", "-articles"])
    .populate({
      path: "athletes",
      select: "-_id -__v",
    });
  query.exec((error, doc) => {
    if (error) {
      return res
        .status(500)
        .send({ success: false, msg: "internal server error" });
    }
    res.send(doc.athletes);
  });
});

/**
 *  Returns list of news for team
 *  Path: "/teams/:id/news"
 *  id - team abbreviation
 */
Router.route("/:id/news").get((req, res) => {
  const teamId = req.params.id;
  const query = TeamModel.findOne({ team_abbreviation: teamId })
    .select(["-_id", "-__v", "-athletes"])
    .populate({ path: "articles", select: "-_id -__v" });
  query.exec((error, doc) => {
    if (error) {
      return res
        .status(500)
        .send({ success: false, msg: "internal server error" });
    }
    res.send(doc.articles);
  });
});

/**
 *  Returns team object
 *  Path: "/teams/:id"
 *  id - team abbreviation
 */
Router.route("/:id").get((req, res) => {
  const teamId = req.params.id;
  const query = TeamModel.findOne({ team_abbreviation: teamId }).select([
    "-_id",
    "-__v",
    "-athletes",
    "-articles",
  ]);
  query.exec((error, doc) => {
    if (error) {
      return res
        .status(500)
        .send({ success: false, msg: "internal server error" });
    }
    res.send(doc);
  });
});

module.exports = Router;
