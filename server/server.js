const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "bank_management",
});

///////////////////////
// create_corp route //
///////////////////////

app.post("/create_corp", (req, res) => {
    const corpID = req.body.corpID;
    const longName = req.body.longName;
    const shortName = req.body.shortName;
    const reservedAssets = req.body.reservedAssets;
  
    db.query(
      "call create_corporation(?,?,?,?)",
      [corpID, longName, shortName, reservedAssets],
      (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("\n create_corp: values inserted");
            res.send("create_corp: values inserted");
        }
      }
    );
  });



app.listen(3001, () => {
    console.log("Server running on port 3001 ...");
  });