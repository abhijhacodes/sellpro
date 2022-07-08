const express = require("express");
const router = express.Router();
const { signin, signout, signup } = require("../controllers/auth");
const { check } = require("express-validator");

router.post(
  "/signup",
  [
    check(
      "firstname",
      "First Name length should be at least 3 & at most 32"
    ).isLength({
      min: 3,
      max: 32,
    }),
    check(
      "lastname",
      "Last Name length should be at least 3 & at most 32"
    ).isLength({
      min: 3,
      max: 32,
    }),
    check("password", "Password length should be at least 6").isLength({
      min: 6,
    }),
    check("email", "Enter a valid email address").isEmail(),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("password", "Password is required").isLength({
      min: 1,
    }),
    check("email", "Email is required").isLength({
      min: 1,
    }),
    check("email", "Enter a valid email address").isEmail(),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
