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

////////////////////////////////////
////// Q1: create_corp route ///////
////////////////////////////////////

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
            console.log(result);
            console.log("\n create_corp: values inserted");
            res.send("create_corp: values inserted");
        }
      }
    );
  });


////////////////////////////////////
////// Q2: create_bank route ///////
////////////////////////////////////

app.post("/create_bank", (req, res) => {
  const bankID = req.body.bankID;
  const bankName = req.body.bankName;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const reservedAssets = req.body.reservedAssets;
  const corpID = req.body.corpID;
  const manager = req.body.manager;
  const bank_employee = req.body.bank_employee;

  db.query(
    "call create_bank(?,?,?,?,?,?,?,?,?,?)",
    [bankID, bankName, street, city, state, zip, reservedAssets, corpID, manager, bank_employee],
    (err, result) => {
      if (err) {
          console.log(err);
      } else {
          console.log(result)
          console.log("\n create_bank: values inserted");
          res.send("create_bank: values inserted");
      }
    }
  );
});




app.listen(3001, () => {
    console.log("Server running on port 3001 ...");
  });