const Sequelize = require("sequelize");
const sequelize = require("../utility/sql");

const OrderProduct = sequelize.define("orderProduct", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = OrderProduct;
