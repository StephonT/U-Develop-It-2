const express = require("express");
const db = require("./db/connection");

const apiRoutes = require("./routes/apiRoutes");




//imported so that the error message can be used when creating a candidate and all of the info needed is not inputed
const inputCheck = require("./utils/inputCheck");

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ exteded: false }));
app.use(express.json());

//Use the api routes
app.use('/api', apiRoutes);


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

//Start server after DB connection
db.connect(err => {
  if(err) throw err;
  console.log('Database connected 🗄');

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}✨✔`);
  });
});

