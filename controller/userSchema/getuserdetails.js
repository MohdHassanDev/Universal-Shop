const UserModel = require("../../model/userSchema");

const getuserdetails = (req, res) => {
  const { id } = req.body.decoded;
  UserModel.findOne({ _id: id }, (error, data) => {
    if (error) {
      res.status(400).json({ message: "error" });
    } else if (data) {
      res.status(200).json({ message: "success", data });
    }
  });
};

module.exports = getuserdetails;
