const express = require("express");
const path = require('path')
const router = express.Router();
const rootDirectory = require('../utility/directory')

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDirectory, 'views', 'add-product.html'))

});

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
