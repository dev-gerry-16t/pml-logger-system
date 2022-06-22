import mongoose from "mongoose";

const ViewProdErrorSchema = new mongoose.Schema({
  timestamp: Date,
  level: String,
  message: String,
});

module.exports =
  mongoose.models.ProdLogError ||
  mongoose.model("ProdLogError", ViewProdErrorSchema);
