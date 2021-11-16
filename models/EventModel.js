const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    organizer: {
      type: String,
    },
    start_time: {
      type: Date,
    },
    duration: {
      type: Number,
    },
  },
  { _id: true }
);

const EventModel = mongoose.model("Event", EventSchema);

module.exports = EventModel;
