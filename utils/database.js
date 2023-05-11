const Sequelize = require("sequelize");

const sequelize = new Sequelize("digistarts", "root", "abc123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
