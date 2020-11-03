const Item = require('../models/item')
const Cart = require('../models/cart')

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
  Cart.getCartItems(cart => {
    Item.getAll(items => {
      const cartItems = []
      for (item of items) {
        const cartItemInfo = cart.items.find(item1 => item1.id === item.id)
        if (cartItemInfo){
          cartItems.push({itemInfo: item, quantity: cartItemInfo.quantity})
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        items: cartItems
      })
    })

  })

}

exports.postCart = (req, res, next) => {
  const id = req.body.id
  Item.getById(id, item => {
    Cart.addItem(id, item.price)
  })
  res.redirect("/cart")
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders',
  })
}

exports.getProducts = (req, res, next) => {
  const items = Item.getAll((items) => {
    res.render('shop/product-list', {
      pageTitle: 'Products',
      prods: items,
      path: '/products',
    })
  })  
  }

exports.getDetails = (req, res, next) => {
  const id = req.params.id;
  console.log(Item.getById(id, item => {
    res.render('shop/product-detail', {item: item, pageTitle: item.title, path: '/products'})
  }))
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