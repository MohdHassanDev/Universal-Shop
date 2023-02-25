const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const token = req.params.id;
  jwt.verify(token, process.env.SECRET_KEY, (error, data) => {
    if (!error) {
      req.body.decoded = data;
      next();
    } else {
      res.status(200).json({ message: "UnAuth" });
    }
  });
};

module.exports = authToken;
