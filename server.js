const express = require("express");
const mysql = require("mysql2")

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
db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
})

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}✨✔`);
});
