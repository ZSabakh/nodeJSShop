const express = require("express");
const path = require('path')
const rootDiretory = require('../utility/directory')
//To get products data
const adminRoutes = require('./admin')
const router = express.Router();

router.get("/", (req, res, next) => {
  const items = adminRoutes.items;
  res.render('shop', {
    pageTitle: 'Shop',
    prods: items,
    path: '/',
    activeShop: true,
    CSSProduct:true,
    isProducts: items.length > 0,
  })
});

module.exports = router;
