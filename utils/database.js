const Sequelize = require("sequelize");

const sequelize = new Sequelize("vanguard", "root", "2035", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
