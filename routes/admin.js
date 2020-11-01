const express = require("express");
const path = require('path')
const router = express.Router();
const itemsController = require('../controllers/admin')


router.get('/products', itemsController.getAdminProducts)
router.get("/add-product", itemsController.getAddItem);
router.get('/edit-product/:id', itemsController.getEditItem)
router.post("/add-product", itemsController.postAddItem);
router.post("/edit-product", itemsController.postEditItem);
router.post("/delete-product", itemsController.postDeleteItem);

module.exports = router
