const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const notFound = require("./controllers/404");
const app = express();
const mongoConnection = require("./utility/nosql").connect;

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(notFound);

mongoConnection((client) => {
  app.listen(4000);
});
