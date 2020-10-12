const express = require("express");
const path = require('path')
const router = express.Router();
const itemsController = require('../controllers/items')



router.get("/add-product", itemsController.getAddItem);

router.post("/add-product", itemsController.postAddItem);

module.exports = router
