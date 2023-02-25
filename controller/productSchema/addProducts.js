const ProductModel = require("../../model/productSchema");

const addProducts = (req, res) => {
  ProductModel.create(req.body, (error, _) => {
    if (error) {
      res.status(400).json({ message: "error" });
    } else {
      res.status(200).json({ message: "success" });
    }
  });
};

module.exports = addProducts;
