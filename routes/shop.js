const express = require("express");
//To get products data
const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/checkout", shopController.getCheckout);
router.get("/products", shopController.getProducts);
router.get("/products/:id", shopController.getDetails);
router.get("/cart", shopController.getCart);
router.post("/card-delete-item", shopController.postRemoveItem);
router.post("/cart", shopController.postCart);
router.get("/orders", shopController.getOrders);
router.get("/", shopController.getIndex);

module.exports = router;
