const ProductModel = require("../../model/productSchema");

const editproduct = (req, res) => {
  const { id, name, stock, amount, productdetails, category } = req.body;
  ProductModel.findByIdAndUpdate(
    { _id: id },
    { name, stock, amount, category, productdetails },
    (error, data) => {
      if (error) {
        res.status(400).json({ message: "error" });
      } else {
        res.status(200).json({ message: "success" });
      }
    }
  );
};

module.exports = editproduct;
