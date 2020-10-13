const Item = require('../models/item')

exports.getAddItem = (req, res, next) => {
    res.render('add-product', {pageTitle: 'Add Prod',
    path: '/admin/add-product',
    CSSForms: true,
    CSSProduct: true,
    activeAddProducts: true,
    })
  }

exports.postAddItem = (req, res, next) => {
    const item = new Item(req.body.title)
    item.save()
    res.redirect("/");
  }

exports.getItems = (req, res, next) => {
  const items = Item.getAll()  
  res.render('shop', {
      pageTitle: 'Shop',
      prods: items,
      path: '/',
      activeShop: true,
      CSSProduct:true,
      isProducts: items.length > 0,
    })
  }