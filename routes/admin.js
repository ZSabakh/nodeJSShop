const express = require("express");
const path = require('path')
const router = express.Router();
const rootDirectory = require('../utility/directory')

const items = []

router.get("/add-product", (req, res, next) => {
  res.render('add-product', {pageTitle: 'Add Prod'})

});

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  items.push({title: req.body.title})
  res.redirect("/");
});

exports.routes = router;
exports.items = items
