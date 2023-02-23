const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpendingSchema = new Schema({
  type: String,
  date: Date,
  amount: Number,
});

const Spending = mongoose.model("spending", SpendingSchema);

module.exports = Spending;
