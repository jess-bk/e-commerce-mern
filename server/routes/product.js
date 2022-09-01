const express = require("express");
const router = express.Router();
const product = require("../controllers/product");
const ISADMIN_LIST = require("../config/isAdmin_list");
const verifyAdmin = require("../middleware/verifyAdmin");

router
  .route("/")
  .get(
    verifyAdmin(ISADMIN_LIST.Admin, ISADMIN_LIST.User),
    product.createProduct
  );

router
  .route("/:id")
  .put(
    verifyAdmin(ISADMIN_LIST.Admin, ISADMIN_LIST.User),
    product.updateProducts
  );

module.exports = router;
