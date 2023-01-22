const UserModel = require("../../model/userSchema");
const bcryptjs = require("bcryptjs");

const Signup = (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email }, async (error, user) => {
    if (error) {
      res.status(400).json({ message: "error" });
    } else if (user) {
      res.status(200).json({ message: "Already a User" });
    } else {
      const hashpass = await bcryptjs.hash(password, 10);
      const userObj = {
        ...req.body,
        password: hashpass,
      };
      UserModel.create(userObj, (error, _) => {
        if (error) {
          res.status(400).json({ message: "error" });
        } else {
          res.status(200).json({ message: "success" });
        }
      });
    }
  });
};

module.exports = Signup;
