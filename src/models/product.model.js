const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  slug: String,
  price: Number,
  stock: Number,
});

module.exports = mongoose.Model("Product", productSchema);
