const express = require("express");
const router = express.Router();
const product = require("../controllers/product");
const ISADMIN_LIST = require("../config/isAdmin_list");
const verifyAdmin = require("../middleware/verifyAdmin");

router
  .route("/")
  .post(
    verifyAdmin(ISADMIN_LIST.Admin, ISADMIN_LIST.User),
    product.createProduct
  )
  .get(
    verifyAdmin(ISADMIN_LIST.Admin, ISADMIN_LIST.User),
    product.getAllProducts
  );

router
  .route("/:id")
  .put(
    verifyAdmin(ISADMIN_LIST.Admin, ISADMIN_LIST.User),
    product.updateProducts
  )
  .delete(
    verifyAdmin(ISADMIN_LIST.Admin, ISADMIN_LIST.User),
    product.deleteProduct
  );

router
  .route("/find/:id")
  .get(verifyAdmin(ISADMIN_LIST.Admin, ISADMIN_LIST.User), product.getProduct);

module.exports = router;
