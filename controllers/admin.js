const Item = require('../models/item')


exports.getAddItem = (req, res, next) => {
    res.render('admin/edit-product', {pageTitle: 'Add Prod',
    path: '/admin/add-product',
    CSSForms: true,
    CSSProduct: true,
    activeAddProducts: true,
    })
  }

exports.getEditItem = (req, res, next) => {
  const editing = req.query.edit
  if(!editing){
    res.redirect("/")
  }
  res.render('admin/edit-product', {
  pageTitle: 'Edit Prod',
  path: '/admin/edit-product',
  editing: editing,
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