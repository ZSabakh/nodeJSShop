const Item = require("../models/item");
const Cart = require("../models/cart");
const sql = require("../utility/sql");

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
    CSSForms: true,
    CSSProduct: true,
    activeAddProducts: true,
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCartItems((cart) => {
    Item.getAll((items) => {
      const cartItems = [];
      for (item of items) {
        const cartItemInfo = cart.items.find((item1) => item1.id === item.id);
        if (cartItemInfo) {
          cartItems.push({ itemInfo: item, quantity: cartItemInfo.quantity });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        items: cartItems,
      });
    });
  });
};

exports.postRemoveItem = (req, res, next) => {
  const id = req.body.id;
  Item.getById(id, (item) => {
    Cart.deleteItem(id, item.price);
    res.redirect("/cart");
  });
};

exports.postCart = (req, res, next) => {
  const id = req.body.id;
  Item.getById(id, (item) => {
    Cart.addItem(id, item.price);
  });
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
};

exports.getProducts = (req, res, next) => {
  Item.findAll()
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
  Item.findByPk(id)
    .then(({ dataValues }) => {
      console.log();
      res.render("shop/product-detail", {
        item: dataValues,
        pageTitle: dataValues.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Item.findAll()
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
