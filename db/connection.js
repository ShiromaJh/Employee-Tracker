const mysql = require("mysql");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employeetracker_db",
  },
  console.log("database connected.")
);

module.exports = db;