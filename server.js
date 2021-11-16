const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const EventRoutes = require("./routes/EventRoutes");
const AthleteRoutes = require("./routes/AthleteRoutes");
const TeamRoutes = require("./routes/TeamRoutes");

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGODB_URI, {})
  .then(() => {
    console.log("connection to mongodb successful");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true, 
    optionSuccessStatus: 200,
  })
);

app.use("/events", EventRoutes);
app.use("/athletes", AthleteRoutes);
app.use("/teams", TeamRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`App started at https://localhost:${PORT}`);
});
