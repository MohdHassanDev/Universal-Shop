const ProductModel = require("../../model/productSchema");

const getAllProducts = (req, res) => {
  ProductModel.find({}, (error, data) => {
    if (error) {
      res.status(400).json({ message: "error" });
    } else {
      res.status(200).json({ message: "success", data });
    }
  });
};

module.exports = getAllProducts;
