const Item = require("../models/item");

exports.getAddItem = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Prod",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.getEditItem = (req, res, next) => {
  const editing = req.query.edit;
  if (!editing) {
    return res.redirect("/");
  }
  const id = req.params.id;
  Item.findByPk(id)
    .then((item) => {
      if (!item) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Prod",
        path: "/admin/edit-product",
        editing: editing,
        item: item,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditItem = (req, res, next) => {
  const id = req.body.id;
  const newTitle = req.body.title;
  const newDescription = req.body.description;
  const newPrice = req.body.price;
  const newImageUrl = req.body.imageUrl;
  const newItem = new Item(id, newTitle, newImageUrl, newDescription, newPrice);

  Item.findByPk(id)
    .then((item) => {
      item.title = newTitle;
      item.description = newDescription;
      item.price = newPrice;
      item.imageUrl = newImageUrl;
      return item.save();
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddItem = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;

  Item.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
  })
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};

exports.getAdminProducts = (req, res, next) => {
  Item.findAll()
    .then((items) => {
      res.render("admin/products", {
        pageTitle: "Admin Items",
        prods: items,
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // const items = Item.getAll((items) => {
  //   res.render("admin/products", {
  //     pageTitle: "Manage products",
  //     path: "/admin/products",
  //     prods: items,
  //   });
  // });
};

exports.postDeleteItem = (req, res, next) => {
  const id = req.body.id;
  Item.deleteId(id);
  res.redirect("/admin/products");
};
