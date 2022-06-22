import mongoose from "mongoose";

const ViewTestWarningSchema = new mongoose.Schema({
  timestamp: Date,
  level: String,
  message: String,
});

module.exports =
  mongoose.models.TestLogWarning ||
  mongoose.model("TestLogWarning", ViewTestWarningSchema);
