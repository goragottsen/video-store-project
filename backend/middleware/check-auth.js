const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_must_remain_a_secret");
    next();
  } catch (error) {
      res.status(401).json({ message: "Auth failed"});
  }
};
