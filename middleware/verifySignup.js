const User = require("../models/User");

const checkDuplicateLoginOrEmail = (req, res, next) => {
  User.findOne({
    login: req.body.login,
  }).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    if (user) {
      res.status(400).json({ message: "This login already exists!" });
      return;
    }
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      if (user) {
        res.status(400).json({ message: "This email already exists!" });
        return;
      }
      next();
    });
  });
};

module.exports = { checkDuplicateLoginOrEmail };
