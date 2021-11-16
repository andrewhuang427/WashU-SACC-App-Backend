const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  team: String,
  team_abbreviation: String,
  athletes: [{ type: Schema.Types.ObjectId, ref: "Athlete" }],
});

const TeamModel = mongoose.model("Team", TeamSchema);

module.exports = TeamModel;
