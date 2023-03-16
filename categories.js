const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
  image: String,
  name: String,
});

const Categories = mongoose.model("categories", CategoriesSchema);

module.exports = Categories;
