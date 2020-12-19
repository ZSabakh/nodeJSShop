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
    .getCart()
    .then((cart) => {
      return cart.getItems({ where: { id: id } });
    })
    .then((items) => {
      const item = items[0];
      return item.cartProduct.destroy();
    })
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
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getItems();
    })
    .then((items) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addItems(
            items.map((item) => {
              item.orderProduct = { quantity: item.cartProduct.quantity };
              return item;
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .then((result) => {
      return fetchedCart.setItems(null);
    })
    .then((res) => {
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
    });
  // let fetchedCart;
  // let newQuantity = 1;
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;
  //     return cart.getItems({ where: { id: id } });
  //   })
  //   .then((items) => {
  //     let item;
  //     if (items.length > 0) {
  //       item = items[0];
  //     }
  //     if (item) {
  //       const quantityBefore = item.cartProduct.quantity;
  //       newQuantity = quantityBefore + 1;
  //       return item;
  //     }
  //     return Item.findByPk(id);
  //   })
  //   .then((item) => {
  //     return fetchedCart.addItem(item, {
  //       through: { quantity: newQuantity },
  //     });
  //   })
  //   .then(() => {
  //     res.redirect("/cart");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
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
