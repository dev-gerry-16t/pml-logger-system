import mongoose from "mongoose";

const ViewProdWarningSchema = new mongoose.Schema({
  timestamp: Date,
  level: String,
  message: String,
});

module.exports =
  mongoose.models.ProdLogWarning ||
  mongoose.model("ProdLogWarning", ViewProdWarningSchema);
