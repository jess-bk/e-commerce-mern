const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const ISADMIN_LIST = require("../config/isAdmin_list");
const verifyAdmin = require("../middleware/verifyAdmin");

router
  .route("/:id")
  .put(verifyAdmin(ISADMIN_LIST.Admin), users.updateUser)
  .delete(verifyAdmin(ISADMIN_LIST.Admin, ISADMIN_LIST.User), users.deleteUser);

router.route("/find/:id").get(verifyAdmin(ISADMIN_LIST.Admin), users.getUser);
router
  .route("/")
  .get(verifyAdmin(ISADMIN_LIST.Admin, ISADMIN_LIST.User), users.getAllUsers);
router
  .route("/stats")
  .get(verifyAdmin(ISADMIN_LIST.Admin, ISADMIN_LIST.User), users.getUserStats);

module.exports = router;
