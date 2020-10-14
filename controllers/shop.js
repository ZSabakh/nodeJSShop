const Item = require('../models/item')

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
    CSSForms: true,
    CSSProduct: true,
    activeAddProducts: true,
  })
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Cart',
    path: '/cart',
  })
}



exports.getProducts = (req, res, next) => {
  const items = Item.getAll((items) => {
    res.render('shop/item-list', {
      pageTitle: 'Products',
      prods: items,
      path: '/products',
    })
  })  
  }

exports.getIndex = (req, res, next) => {
  const items = Item.getAll((items) => {
    res.render('shop/index', {
      pageTitle: 'Main',
      prods: items,
      path: '/',
    })
  })  
}