const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
require("dotenv").config();

const login = (req, res) => {
  const token = jwt.sign(
    {
      id: uuidv4(),
    },
    process.env.JWT,
    { expiresIn: 60 * 60 }
  );
  res.status(200).json({
    token: `Bearer ${token}`,
  });
};

const signup = async (req, res) => {
  const { login, email } = req.body;

  const salt = bcrypt.genSaltSync(Number(process.env.SALT));
  const password = req.body.password;

  const user = new User({
    login,
    email,
    password: bcrypt.hashSync(password, salt),
  });

  try {
    const newUser = await user.save();
    res.status(200).json({
      newUser,
      message: "The new user has been successfully registered.",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { login, signup };
