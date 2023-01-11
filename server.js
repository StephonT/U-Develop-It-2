const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ exteded: false }));
app.use(express.json());

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

//Database Calls
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });

// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(row);
// });

// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

//Create Query for create operation
const sql = `INSERT INTO candidates(id,first_name, last_name, industry_connected)
VALUES(?,?,?,?)`;

const params = [1, "Stephon", "Treadwell", true];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}✨✔`);
});
