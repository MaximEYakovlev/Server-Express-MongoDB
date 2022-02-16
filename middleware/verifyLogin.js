const bcrypt = require("bcryptjs");
const User = require("../models/User");

const checkPassword = (userPassword, reqBodyPassword) => {
  const passwordResult = bcrypt.compareSync(reqBodyPassword, userPassword);
  return passwordResult;
};

const checkIfLoginOrEmailAndPasswordExist = (req, res, next) => {
  User.findOne({
    login: req.body.login,
  }).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    if (user) {
      try {
        if (checkPassword(user.password, req.body.password)) {
          next();
        } else {
          res.status(400).json({ message: "Invalid password!" });
        }
      } catch (error) {
        res.status(400).json({ message: "Incorrect password!" });
      }
    }
    if (!user) {
      User.findOne({
        email: req.body.email,
      }).exec((err, user) => {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }
        if (!user) {
          res
            .status(400)
            .json({ message: "The specified credentials do not exist!" });
          return;
        }
        try {
          if (checkPassword(user.password, req.body.password)) {
            next();
          } else {
            res.status(400).json({ message: "Invalid password!" });
          }
        } catch (error) {
          res.status(400).json({ message: "Incorrect password!" });
        }
      });
    }
  });
};

module.exports = { checkIfLoginOrEmailAndPasswordExist };
