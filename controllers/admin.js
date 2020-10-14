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
    const item = new Item(req.body.title)
    item.save()
    res.redirect("/");
  }

  exports.getAdminProducts = (req, res, next) => {
    const items = Item.getAll((items) => {
        res.render('admin/list-product', {
            pageTitle: 'Manage products',
            path: '/admin/products',
          })
      })  
  }