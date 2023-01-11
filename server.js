const express = require("express");
const mysql = require("mysql2");

//imported so that the error message can be used when creating a candidate and all of the info needed is not inputed
const inputCheck = require("./utils/inputCheck");

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

//Get All Candidates
app.get("/api/candidates", (req, res) => {
  const sql = `SELECT candidates.*, parties.name 
             AS party_name 
             FROM candidates 
             LEFT JOIN parties 
             ON candidates.party_id = parties.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Get Single Candidate
app.get("/api/candidate/:id", (req, res) => {
  const sql = `SELECT candidates.*, parties.name 
             AS party_name 
             FROM candidates 
             LEFT JOIN parties 
             ON candidates.party_id = parties.id`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

//Delete Candidate
app.delete("/api/candidate/:id", (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Candidate not found",
      });
    } else {
      res.json({
        messgage: "Candidate deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

//Create Candidate
app.post("/api/candidate", ({ body }, res) => {
  const errors = inputCheck(
    body,
    "first_name",
    "last_name",
    "industry_connected"
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO candidates(first_name, last_name, industry_connected)
VALUES(?,?,?)`;

  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Successfully created candidate",
      data: body
    });
  });
});



// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}✨✔`);
});
