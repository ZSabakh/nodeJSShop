const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const notFound = require("./controllers/404");
const sql = require("./utility/sql");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(notFound);

app.listen(4000);
