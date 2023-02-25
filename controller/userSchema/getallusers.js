const UserModel = require("../../model/userSchema");

const getallusers = (req, res) => {
  UserModel.find({ role: "user" }, (error, data) => {
    if (error) {
      res.status(400).json({ message: "error" });
    } else {
      res.status(200).json({ message: "success", data });
    }
  });
};

module.exports = getallusers;
