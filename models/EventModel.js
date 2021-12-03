const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
  },
  { _id: true }
);

const EventModel = mongoose.model("Event", EventSchema);

module.exports = EventModel;
