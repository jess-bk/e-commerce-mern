const express = require("express");
const router = express.Router();
const stripe = require("../utils/stripe");

router.route("/payment").get(stripe.stripePayment);

module.exports = router;
