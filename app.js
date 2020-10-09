const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')

const app = express();

app.set('view engine', 'ejs')
app.set('views','views')

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')))

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);
app.use("/", (req, res, next) => {
  res.status(404).render('404', {pageTitle: '404'});
});

app.listen(4000);
