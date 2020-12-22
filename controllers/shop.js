const Item = require("../models/item");

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     pageTitle: "Checkout",
//     path: "/checkout",
//     CSSForms: true,
//     CSSProduct: true,
//     activeAddProducts: true,
//   });
// };

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((items) => {
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        items: items,
      });
    })

    .catch((err) => {
      console.log(err);
    });
};

exports.postRemoveItem = (req, res, next) => {
  const id = req.body.id;
  req.user
    .deleteCartItem(id)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const id = req.body.id;

  Item.getDetail(id)
    .then((item) => {
      return req.user.toCart(item);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["items"] })
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Orders",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Item.getAll()
    .then((items) => {
      res.render("shop/product-list", {
        pageTitle: "All Items",
        prods: items,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDetails = (req, res, next) => {
  const id = req.params.id;
  // Item.findAll({where: {id: id}}).then(
  //   Gives array coz tis findsall
  // ).catch(err => {console.log(err)})
  // ^^ Old sequelize code ^^
  Item.getDetail(id)
    .then((item) => {
      console.log(item);
      res.render("shop/product-detail", {
        item: item,
        pageTitle: item.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Item.getAll()
    .then((items) => {
      res.render("shop/index", {
        pageTitle: "Main",
        prods: items,
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// (items) => {
//   res.render("shop/index", {
//     pageTitle: "Main",
//     prods: items,
//     path: "/",
//   });
// }
