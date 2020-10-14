const express = require("express");
const path = require('path')
const router = express.Router();
const itemsController = require('../controllers/admin')


router.get('/products', itemsController.getAdminProducts)
router.get("/add-product", itemsController.getAddItem);

router.post("/add-product", itemsController.postAddItem);

module.exports = router
