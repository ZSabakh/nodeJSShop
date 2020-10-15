const Item = require('../models/item')


exports.getAddItem = (req, res, next) => {
    res.render('admin/add-product', {pageTitle: 'Add Prod',
    path: '/admin/add-product',
    CSSForms: true,
    CSSProduct: true,
    activeAddProducts: true,
    })
  }

exports.postAddItem = (req, res, next) => {
    const title = req.body.title
    const description = req.body.description
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const item = new Item(title, imageUrl,description,price)
    item.save()
    res.redirect("/");
  }

  exports.getAdminProducts = (req, res, next) => {
    const items = Item.getAll((items) => {
        res.render('admin/products', {
            pageTitle: 'Manage products',
            path: '/admin/products',
            prods: items
          })
      })  
  }