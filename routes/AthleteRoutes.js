const PlayerModel = require("../models/AthleteModel");
const express = require("express");
const TeamModel = require("../models/TeamModel");

const Router = express.Router();

/**
 *  Returns all players
 *  Path: "/athletes?team=<team_abbreviation>"
 *  Team Abbreviations: Baseball - bsb, Women's Soccer - wsoc, Men's Soccer - msoc
 */
Router.route("").get((req, res) => {
  const team = req.query.team;
  let query = PlayerModel.find({});
  if (team !== undefined && team !== "") {
    query = PlayerModel.find({ team_abbreviation: team });
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
 *  Save player
 *  Path: "/athletes"
 */
Router.route("").post((req, res) => {
  const newPlayer = new PlayerModel(req.body);
  newPlayer.save((error, doc) => {
    if (error) {
      return res
        .status(500)
        .send({ success: false, msg: "internal server error" });
    }
    addToTeam(doc);
    res.send(doc);
  });
});

module.exports = Router;

const addToTeam = (athlete) => {
  const id = athlete._id;
  const query = TeamModel.findOneAndUpdate(
    { team_abbreviation: athlete.team_abbreviation },
    { $addToSet: { athletes: id } }
  );
  query.exec();
};
