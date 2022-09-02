const express = require("express");
const router = express.Router();
const order = require("../controllers/order");
const ISADMIN_LIST = require("../config/isAdmin_list");
const verifyAdmin = require("../middleware/verifyAdmin");

router
  .route("/")
  .post(verifyAdmin(ISADMIN_LIST.Admin, ISADMIN_LIST.User), order.createOrder)
  .get(verifyAdmin(ISADMIN_LIST.Admin), order.getAllOrders);

router
  .route("/:id")
  .put(verifyAdmin(ISADMIN_LIST.Admin), order.updateOrder)
  .delete(verifyAdmin(ISADMIN_LIST.Admin), order.deleteOrder);

router
  .route("/find/:userId")
  .get(verifyAdmin(ISADMIN_LIST.Admin, ISADMIN_LIST.User), order.getUserOrder);

router
  .route("/income")
  .get(verifyAdmin(ISADMIN_LIST.Admin), order.getMonthlyIncome);

module.exports = router;
