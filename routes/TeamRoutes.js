const TeamModel = require("../models/TeamModel");
const express = require("express");

const Router = express.Router();

/**
 *  Returns list of all teams or returns specific team if team abbrev. is provided
 *  Path: "/teams?team=<team_abbreviation>"
 */
Router.route("").get((req, res) => {
  const team = req.query.team;
  let query = TeamModel.find({}).select("-athletes");
  if (team !== undefined && team !== "") {
    query = TeamModel.findOne({ team_abbreviation: team }).populate("athletes");
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

/**
 *  Returns team object with populated athletes
 *  Path: "/teams/:id"
 *  id - object id of team being searched for
 */
Router.route("/:id").get((req, res) => {
  const teamId = req.params.id;
  const query = TeamModel.findById(teamId).populate("athletes");
  query.exec((error, doc) => {
    if (error) {
      return res
        .status(500)
        .send({ success: false, msg: "internal server error" });
    }
    res.send(doc);
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

module.exports = Router;
