const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const notFound = require("./controllers/404");
const sequelize = require("./utility/sql");
const Item = require("./models/item");
const User = require("./models/users");
const Cart = require("./models/cart");
const CartProduct = require("./models/cart-product");
const Order = require("./models/order");
const OrderProduct = require("./models/order-product");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(notFound);

Item.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Item);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Item, { through: CartProduct });
Item.belongsToMany(Cart, { through: CartProduct });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Item, { through: OrderProduct });

sequelize
  .sync()
  .then((res) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "admin", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
