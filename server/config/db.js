const { Sequelize } = require("sequelize");

const db = new Sequelize(
  "sql12737126",
  "sql12737126",
  "iRHy4LqyHL",
  {
    host: "sql12.freesqldatabase.com",
    dialect: "mysql",
    port: 3306,
    logging: false,
  }
);

try {
  db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = db;
