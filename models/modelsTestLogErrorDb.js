import mongoose from "mongoose";

const ViewTestErrorSchema = new mongoose.Schema({
  timestamp: Date,
  level: String,
  message: String,
});

module.exports =
  mongoose.models.TestLogError ||
  mongoose.model("TestLogError", ViewTestErrorSchema);
