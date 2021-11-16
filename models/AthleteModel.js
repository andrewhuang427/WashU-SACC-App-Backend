const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AthleteSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    height: String,
    weight: String,
    team: String,
    team_abbreviation: String,
    hometown: String,
    number: String,
    grade: String,
    image_url: String,
  },
  { _id: true }
);

const AthleteModel = mongoose.model("Athlete", AthleteSchema);

module.exports = AthleteModel;
