const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

const { makePayment } = require("../controllers/checkout");

router.post("/checkout", isSignedIn, isAuthenticated, makePayment);

module.exports = router;
