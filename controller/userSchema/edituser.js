const UserModel = require("../../model/userSchema");

const edituser = (req, res) => {
  const { id } = req.body.decoded;
  UserModel.findByIdAndUpdate({ _id: id }, req.body, (error, data) => {
    if (error) {
      res.status(400).json({ message: "error" });
    } else if (data) {
      res.status(200).json({ message: "success" });
    }
  });
};

module.exports = edituser;
