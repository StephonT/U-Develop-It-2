const mysql = require("mysql2");

//connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    //MySQL username
    user: "root",
    //MySQL password
    password: "LeahBean2020!",
    database: "election",
  },
  console.log(`Connected to the election database🗄`)
);

module.exports = db;