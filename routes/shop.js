const express = require("express");
//To get products data
const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/products/:id", shopController.getDetails);
router.get("/cart", shopController.getCart);
// router.post("/new-order", shopController.postOrder);
router.post("/card-delete-item", shopController.postRemoveItem);
router.post("/cart", shopController.postCart);
// router.get("/orders", shopController.getOrders);

module.exports = router;
