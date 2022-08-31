const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const ISADMIN_LIST = require("../config/isAdmin_list");
const verifyAdmin = require("../middleware/verifyAdmin");

router
  .route("/:id")
  .put(verifyAdmin(ISADMIN_LIST.Admin), users.updateUser)
  .delete(verifyAdmin(ISADMIN_LIST.Admin, ISADMIN_LIST.User), users.deleteUser);

module.exports = router;
