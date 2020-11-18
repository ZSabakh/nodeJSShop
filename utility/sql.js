const SEQUELIZE = require("sequelize");

const sequelize = new SEQUELIZE("node", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
