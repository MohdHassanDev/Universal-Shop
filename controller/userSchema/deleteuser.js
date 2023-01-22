const UserModel = require("../../model/userSchema");

const deleteuser = (req, res) => {
  const { id } = req.params;
  UserModel.findByIdAndDelete({ _id: id }, (error, data) => {
    if (error) {
      res.status(400).json({ message: "error" });
    } else if (data) {
      res.status(200).json({ message: "success" });
    }
  });
};

module.exports = deleteuser;
