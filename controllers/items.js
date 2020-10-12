const items = []

exports.getAddItem = (req, res, next) => {
    res.render('add-product', {pageTitle: 'Add Prod',
    path: '/admin/add-product',
    CSSForms: true,
    CSSProduct: true,
    activeAddProducts: true,
    })
  }

exports.postAddItem = (req, res, next) => {
    items.push({title: req.body.title})
    res.redirect("/");
  }

exports.getItems = (req, res, next) => {
    res.render('shop', {
      pageTitle: 'Shop',
      prods: items,
      path: '/',
      activeShop: true,
      CSSProduct:true,
      isProducts: items.length > 0,
    })
  }