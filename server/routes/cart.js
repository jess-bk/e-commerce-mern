const express = require("express");
const router = express.Router();
const cart = require("../controllers/cart");
const ISADMIN_LIST = require("../config/isAdmin_list");
const verifyAdmin = require("../middleware/verifyAdmin");

router
  .route("/")
  .post(verifyAdmin(ISADMIN_LIST.Admin, ISADMIN_LIST.User), cart.createCart)
  .get(verifyAdmin(ISADMIN_LIST.Admin), cart.getAllCarts);

router
  .route("/:id")
  .put(verifyAdmin(ISADMIN_LIST.Admin, ISADMIN_LIST.User), cart.updateCart)
  .delete(verifyAdmin(ISADMIN_LIST.Admin, ISADMIN_LIST.User), cart.deleteCart);

router
  .route("/find/:userId")
  .get(verifyAdmin(ISADMIN_LIST.Admin, ISADMIN_LIST.User), cart.getUserCart);

module.exports = router;
