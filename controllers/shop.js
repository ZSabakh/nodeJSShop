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
  Item.getAll()
    .then(([items, data]) => {
      res.render("shop/product-list", {
        pageTitle: "Products",
        prods: items,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // const items = Item.getAll((items) => {
  //   res.render("shop/product-list", {
  //     pageTitle: "Products",
  //     prods: items,
  //     path: "/products",
  //   });
  // });
};

exports.getDetails = (req, res, next) => {
  const id = req.params.id;
  console.log(
    Item.getById(id)
      .then(([item]) => {
        res.render("shop/product-detail", {
          // Even though I used destructuring, item
          // is still an array. first object of that array
          // is the actual data
          item: item[0],
          pageTitle: item.title,
          path: "/products",
        });
      })
      .catch((err) => {
        console.log(err);
      })
  );
};

exports.getIndex = (req, res, next) => {
  Item.getAll()
    //Destructuring below, just getting results[0]
    //and results[1] separately

    .then(([items, data]) => {
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
