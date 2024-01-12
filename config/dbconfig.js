const { DATABASE, DBUSER, PASSWORD, SERVER, DBPORT, DIALECT } = process.env;

var jsconfig = {
  development: {
    username: DBUSER,
    password: PASSWORD,
    database: DATABASE,
    host: SERVER,
    dialect: DIALECT,
    port: DBPORT,
  },

  production: {
    username: DBUSER,
    password: PASSWORD,
    database: DATABASE,
    host: SERVER,
    dialect: DIALECT,
    port: DBPORT,
  },
};

module.exports = jsconfig;

const { Sequelize } = require("sequelize");

const dbConnection = async () => {
  const sequelize = new Sequelize(DATABASE, DBUSER, PASSWORD, {
    host: SERVER,
    dialect: DIALECT,
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// dbConnection();
