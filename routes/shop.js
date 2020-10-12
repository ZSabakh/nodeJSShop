const express = require("express");
//To get products data
const itemsController = require('../controllers/items')

const router = express.Router();


router.get("/", itemsController.getItems);

module.exports = router;
