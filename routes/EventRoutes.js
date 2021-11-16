const EventModel = require("../models/EventModel");
const express = require("express");

const Router = express.Router();

/**
 *  Returns all events
 */
Router.route("/").get((req, res) => {
  const query = EventModel.find({});
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
 *  Create new event
 */
Router.route("/").post((req, res) => {
  const newEvent = new EventModel(req.body);
  newEvent.save((error) => {
    if (error)
      return res
        .status(500)
        .send({ success: false, msg: "internal server error" });
    res.send({
      success: true,
      msg: "new event saved successfully",
      event: req.body,
    });
  });
});

/**
 *  Delete event
 */
Router.route("/:id").delete((req, res) => {
  const id = req.params.id;
  const query = EventModel.findByIdAndDelete(id, {});
  query.exec((error, doc) => {
    if (err) return res.status(500).send("internal server error");
    res.send({
      success: true,
      msg: "event deleted successfully",
    });
  });
});

module.exports = Router;
