const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");
const verifySignup = require("../middleware/verifySignup");
const verifyLogin = require("../middleware/verifyLogin");

router.post(
  "/login",
  verifyLogin.checkIfLoginOrEmailAndPasswordExist,
  controller.login
);

router.post(
  "/signup",
  verifySignup.checkDuplicateLoginOrEmail,
  controller.signup
);

module.exports = router;
