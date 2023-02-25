const UserModel = require("../../model/userSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email }, async (error, data) => {
    if (error) {
      res.status(400).json({ message: "error" });
    } else if (data) {
      await bcryptjs
        .compare(password, data.password)
        .then(async (password) => {
          if (password) {
            try {
              const token = await jwt.sign(
                { id: data._id },
                process.env.SECRET_KEY,
                {
                  expiresIn: 86400,
                }
              );
              res
                .status(200)
                .json({ message: "success", token, role: data.role });
            } catch (error) {
              console.log(error);
            }
          } else {
            res.status(200).json({ message: "Invalid Credentials" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      res.status(200).json({ message: "Invalid Credentials" });
    }
  });
};

module.exports = login;
