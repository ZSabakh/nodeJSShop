const Item = require("../models/item");
const mongodb = require("mongodb");

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
  Item.getDetail(id)
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

  const item = new Item(
    newTitle,
    newPrice,
    newDescription,
    newImageUrl,
    new mongodb.ObjectID(id)
  );

  item
    .save()
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
  const item = new Item(title, price, description, imageUrl);

  item
    .save()
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAdminProducts = (req, res, next) => {
  Item.getAll()
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
};

exports.postDeleteItem = (req, res, next) => {
  const id = req.body.id;
  Item.delete(id)
    .then((response) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
