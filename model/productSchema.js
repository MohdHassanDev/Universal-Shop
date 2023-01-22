const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String },
  amount: { type: String },
  image: { type: Object },
  stock: { type: String },
  category: { type: String },
  productdetails: { type: String },
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;
