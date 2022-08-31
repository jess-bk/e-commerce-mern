const express = require("express");
const router = express.Router();
const refreshTokens = require("../middleware/refreshTokens");

router.get("/", refreshTokens.handleRefreshToken);

module.exports = router;
