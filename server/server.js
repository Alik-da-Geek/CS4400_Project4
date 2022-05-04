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
var create_corp_call_idx = 0;
app.post("/create_corp", (req, res) => {
  create_corp_call_idx++;

  const corpID = req.body.corpID;
  const longName = req.body.longName;
  const shortName = req.body.shortName;
  const reservedAssets = req.body.reservedAssets;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("CREATE_CORP call " + create_corp_call_idx + "\n");
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "corpID: " +
      corpID +
      "\n" +
      "longName: " +
      longName +
      "\n" +
      "shortName: " +
      shortName +
      "\n" +
      "reservedAssets: " +
      reservedAssets +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "call create_corporation(?,?,?,?)",
    [corpID, longName, shortName, reservedAssets],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("\n!!!!! CREATE_CORP: ERROR INSERTING VALUES !!!!!");
        res.send(
          "CREATE_CORP call " +
            create_corp_call_idx +
            ": ERROR INSERTING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nCREATE_CORP: VALUES INSERTED");
        res.send(
          "CREATE_CORP call " + create_corp_call_idx + ": VALUES INSERTED"
        );
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

////////////////////////////////////
////// Q2: create_bank route ///////
////////////////////////////////////
var create_bank_call_idx = 0;
app.post("/create_bank", (req, res) => {
  create_bank_call_idx++;

  const bankID = req.body.bankID;
  const bankName = req.body.bankName;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const reservedAssets = req.body.reservedAssets;
  const corpID = req.body.corpID;
  const manager = req.body.manager;
  const bank_employee = req.body.bankEmployee;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("CREATE_BANK call " + create_bank_call_idx + "\n");
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "bankID: " +
      corpID +
      "\n" +
      "bankName: " +
      bankName +
      "\n" +
      "street: " +
      street +
      "\n" +
      "city: " +
      city +
      "\n" +
      "state: " +
      state +
      "\n" +
      "zip: " +
      zip +
      "\n" +
      "reservedAssets: " +
      reservedAssets +
      "\n" +
      "corpID: " +
      corpID +
      "\n" +
      "manager: " +
      manager +
      "\n" +
      "bank_employee: " +
      bank_employee +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "call create_bank(?,?,?,?,?,?,?,?,?,?)",
    [
      bankID,
      bankName,
      street,
      city,
      state,
      zip,
      reservedAssets,
      corpID,
      manager,
      bank_employee,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("\n!!!!! CREATE_BANK: ERROR INSERTING VALUES !!!!!");
        res.send(
          "CREATE_BANK call " +
            create_bank_call_idx +
            ": ERROR INSERTING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nCREATE_BANK: VALUES INSERTED");
        res.send(
          "CREATE_BANK call " + create_bank_call_idx + ": VALUES INSERTED"
        );
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

///////////////////////////////////////////
///// Q3: start_employee_role route ///////
///////////////////////////////////////////
var start_employee_role_call_idx = 0;
app.post("/start_employee_role", (req, res) => {
  start_employee_role_call_idx++;

  const perID = req.body.perID;
  const taxID = req.body.taxID;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthdate = req.body.birthdate;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const dtJoined = req.body.dtJoined;
  const salary = req.body.salary;
  const payments = req.body.payments;
  const earned = req.body.earned;
  const emp_password = req.body.emp_password;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log(
    "START_EMPLOYEE_ROLE call " + start_employee_role_call_idx + "\n"
  );
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "perID: " +
      perID +
      "\n" +
      "taxID: " +
      taxID +
      "\n" +
      "firstName: " +
      firstName +
      "\n" +
      "lastName: " +
      lastName +
      "\n" +
      "birthdate: " +
      birthdate +
      "\n" +
      "street: " +
      street +
      "\n" +
      "city: " +
      city +
      "\n" +
      "state: " +
      state +
      "\n" +
      "zip: " +
      zip +
      "\n" +
      "dtJoined: " +
      dtJoined +
      "\n" +
      "salary: " +
      salary +
      "\n" +
      "payments: " +
      payments +
      "\n" +
      "earned: " +
      earned +
      "\n" +
      "emp_password: " +
      emp_password +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "call start_employee_role(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      perID,
      taxID,
      firstName,
      lastName,
      birthdate,
      street,
      city,
      state,
      zip,
      dtJoined,
      salary,
      payments,
      earned,
      emp_password,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log(
          "\n!!!!! START_EMPLOYEE_ROLE: ERROR INSERTING VALUES !!!!!"
        );
        res.send(
          "START_EMPLOYEE_ROLE call " +
            start_employee_role_call_idx +
            ": ERROR INSERTING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nSTART_EMPLOYEE_ROLE: VALUES INSERTED");
        res.send(
          "START_EMPLOYEE_ROLE call " +
            start_employee_role_call_idx +
            ": VALUES INSERTED"
        );
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

///////////////////////////////////////////
///// Q4: start_customer_role route ///////
///////////////////////////////////////////
var start_customer_role_call_idx = 0;
app.post("/start_customer_role", (req, res) => {
  start_customer_role_call_idx++;

  const perID = req.body.perID;
  const taxID = req.body.taxID;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthdate = req.body.birthdate;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const dtJoined = req.body.dtJoined;
  const cust_password = req.body.cust_password;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log(
    "START_CUSTOMER_ROLE call " + start_customer_role_call_idx + "\n"
  );
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "perID: " +
      perID +
      "\n" +
      "taxID: " +
      taxID +
      "\n" +
      "firstName: " +
      firstName +
      "\n" +
      "lastName: " +
      lastName +
      "\n" +
      "birthdate: " +
      birthdate +
      "\n" +
      "street: " +
      street +
      "\n" +
      "city: " +
      city +
      "\n" +
      "state: " +
      state +
      "\n" +
      "zip: " +
      zip +
      "\n" +
      "dtJoined: " +
      dtJoined +
      "\n" +
      "cust_password: " +
      cust_password +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "call start_customer_role(?,?,?,?,?,?,?,?,?,?,?)",
    [
      perID,
      taxID,
      firstName,
      lastName,
      birthdate,
      street,
      city,
      state,
      zip,
      dtJoined,
      cust_password,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log(
          "\n!!!!! START_CUSTOMER_ROLE: ERROR INSERTING VALUES !!!!!"
        );
        res.send(
          "START_CUSTOMER_ROLE call " +
            start_customer_role_call_idx +
            ": ERROR INSERTING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nSTART_CUSTOMER_ROLE: VALUES INSERTED");
        res.send(
          "START_CUSTOMER_ROLE call " +
            start_customer_role_call_idx +
            ": VALUES INSERTED"
        );
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

///////////////////////////////////////////
////// Q5: stop_employee_role route ///////
///////////////////////////////////////////
var stop_employee_role_call_idx = 0;
app.post("/stop_employee_role", (req, res) => {
  stop_employee_role_call_idx++;

  const perID = req.body.perID;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("STOP_EMPLOYEE_ROLE call " + stop_employee_role_call_idx + "\n");
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "perID: " +
      perID +
      "\n" +
      "--------------------------\n"
  );

  db.query("call stop_employee_role(?)", [perID], (err, result) => {
    if (err) {
      console.log(err);
      console.log("\n!!!!! STOP_EMPLOYEE_ROLE: ERROR INSERTING VALUES !!!!!");
      res.send(
        "STOP_EMPLOYEE_ROLE call " +
          stop_employee_role_call_idx +
          ": ERROR INSERTING VALUES"
      );
    } else {
      console.log(result);
      console.log("\nSTOP_EMPLOYEE_ROLE: VALUES INSERTED");
      res.send(
        "STOP_EMPLOYEE_ROLE call " +
          stop_employee_role_call_idx +
          ": VALUES INSERTED"
      );
    }
    console.log(
      "/////////////////////////////////////////////////////////////////\n"
    );
  });
});

///////////////////////////////////////////
////// Q6: stop_customer_role route ///////
///////////////////////////////////////////
var stop_customer_role_call_idx = 0;
app.post("/stop_customer_role", (req, res) => {
  stop_customer_role_call_idx++;

  const perID = req.body.perID;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("STOP_CUSTOMER_ROLE call " + stop_customer_role_call_idx + "\n");
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "perID: " +
      perID +
      "\n" +
      "--------------------------\n"
  );

  db.query("call stop_customer_role(?)", [perID], (err, result) => {
    if (err) {
      console.log(err);
      console.log("\n!!!!! STOP_CUSTOMER_ROLE: ERROR INSERTING VALUES !!!!!");
      res.send(
        "STOP_CUSTOMER_ROLE call " +
          stop_customer_role_call_idx +
          ": ERROR INSERTING VALUES"
      );
    } else {
      console.log(result);
      console.log("\nSTOP_CUSTOMER_ROLE: VALUES INSERTED");
      res.send(
        "STOP_CUSTOMER_ROLE call " +
          stop_customer_role_call_idx +
          ": VALUES INSERTED"
      );
    }
    console.log(
      "/////////////////////////////////////////////////////////////////\n"
    );
  });
});

///////////////////////////////////////////
////// Q7: hire_worker route ///////
///////////////////////////////////////////
var hire_worker_call_idx = 0;
app.post("/hire_worker", (req, res) => {
  hire_worker_call_idx++;

  const perID = req.body.perID;
  const bankID = req.body.bankID;
  const salary = req.body.salary;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("HIRE_WORKER call " + hire_worker_call_idx + "\n");
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "perID: " +
      perID +
      "\n" +
      "bankID: " +
      bankID +
      "\n" +
      "salary: " +
      salary +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "call hire_worker(?,?,?)",
    [perID, bankID, salary],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("\n!!!!! HIRE_WORKER: ERROR INSERTING VALUES !!!!!");
        res.send(
          "HIRE_WORKER call " +
            hire_worker_call_idx +
            ": ERROR INSERTING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nHIRE_WORKER: VALUES INSERTED");
        res.send(
          "HIRE_WORKER call " + hire_worker_call_idx + ": VALUES INSERTED"
        );
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

///////////////////////////////////////////
////// Q8: replace_manager route ///////
///////////////////////////////////////////
var replace_manager_call_idx = 0;
app.post("/replace_manager", (req, res) => {
  replace_manager_call_idx++;

  const perID = req.body.perID;
  const bankID = req.body.bankID;
  const salary = req.body.salary;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("REPLACE_MANAGER call " + replace_manager_call_idx + "\n");
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "perID: " +
      perID +
      "\n" +
      "bankID: " +
      bankID +
      "\n" +
      "salary: " +
      salary +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "call replace_manager(?,?,?)",
    [perID, bankID, salary],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("\n!!!!! REPLACE_MANAGER: ERROR INSERTING VALUES !!!!!");
        res.send(
          "REPLACE_MANAGER call " +
            replace_manager_call_idx +
            ": ERROR INSERTING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nREPLACE_MANAGER: VALUES INSERTED");
        res.send(
          "REPLACE_MANAGER call " +
            replace_manager_call_idx +
            ": VALUES INSERTED"
        );
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

///////////////////////////////////////////
////// Q9: add_account_access route ///////
///////////////////////////////////////////
var add_account_access_call_idx = 0;
app.post("/add_account_access", (req, res) => {
  add_account_access_call_idx++;

  const requester = req.body.requester;
  const customer = req.body.customer;
  const account_type = req.body.account_type;
  const bankID = req.body.bankID;
  const accountID = req.body.accountID;
  const balance = req.body.balance;
  const interest_rate = req.body.interest_rate;
  const dtDeposit = req.body.dtDeposit;
  const minBalance = req.body.minBalance;
  const numWithdrawals = 0;
  const maxWithdrawals = req.body.maxWithdrawals;
  const dtShareStart = req.body.dtShareStart;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("ADD_ACCOUNT_ACCESS call " + add_account_access_call_idx + "\n");
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "requester: " +
      requester +
      "\n" +
      "customer: " +
      customer +
      "\n" +
      "account_type: " +
      account_type +
      "\n" +
      "bankID: " +
      bankID +
      "\n" +
      "accountID: " +
      accountID +
      "\n" +
      "balance: " +
      balance +
      "\n" +
      "interest_rate: " +
      interest_rate +
      "\n" +
      "dtDeposit: " +
      dtDeposit +
      "\n" +
      "minBalance: " +
      minBalance +
      "\n" +
      "numWithdrawals: " +
      numWithdrawals +
      "\n" +
      "maxWithdrawals: " +
      maxWithdrawals +
      "\n" +
      "dtShareStart: " +
      dtShareStart +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "call add_account_access(?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      requester,
      customer,
      account_type,
      bankID,
      accountID,
      balance,
      interest_rate,
      dtDeposit,
      minBalance,
      numWithdrawals,
      maxWithdrawals,
      dtShareStart,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("\n!!!!! ADD_ACCOUNT_ACCESS: ERROR INSERTING VALUES !!!!!");
        res.send(
          "ADD_ACCOUNT_ACCESS call " +
            add_account_access_call_idx +
            ": ERROR INSERTING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nADD_ACCOUNT_ACCESS: VALUES INSERTED");
        res.send(
          "ADD_ACCOUNT_ACCESS call " +
            add_account_access_call_idx +
            ": VALUES INSERTED"
        );
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

///////////////////////////////////////////
//// Q10: remove_account_access route /////
///////////////////////////////////////////
var remove_account_access_idx = 0;
app.post("/remove_account_access", (req, res) => {
  remove_account_access_idx++;

  const requester = req.body.requester;
  const sharer = req.body.sharer;
  const bankID = req.body.bankID;
  const accountID = req.body.accountID;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("REMOVE_ACCOUNT_ACCESS call " + remove_account_access_idx + "\n");
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "requester: " +
      requester +
      "\n" +
      "sharer: " +
      sharer +
      "\n" +
      "bankID: " +
      bankID +
      "\n" +
      "accountID: " +
      accountID +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "call remove_account_access(?,?,?,?)",
    [requester, sharer, bankID, accountID],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log(
          "\n!!!!! REMOVE_ACCOUNT_ACCESS: ERROR INSERTING VALUES !!!!!"
        );
        res.send(
          "REMOVE_ACCOUNT_ACCESS call " +
            remove_account_access_idx +
            ": ERROR INSERTING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nREMOVE_ACCOUNT_ACCESS: VALUES INSERTED");
        res.send(
          "REMOVE_ACCOUNT_ACCESS call " +
            remove_account_access_idx +
            ": VALUES INSERTED"
        );
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

///////////////////////////////////////////
//// Q11: create_fee route /////
///////////////////////////////////////////
var create_fee_idx = 0;
app.post("/create_fee", (req, res) => {
  create_fee_idx++;

  const bankID = req.body.bankID;
  const accountID = req.body.accountID;
  const fee_type = req.body.fee_type;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("CREATE_FEE call " + create_fee_idx + "\n");
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "bankID: " +
      bankID +
      "\n" +
      "accountID: " +
      accountID +
      "\n" +
      "fee_type: " +
      fee_type +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "call create_fee(?,?,?)",
    [bankID, accountID, fee_type],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("\n!!!!! CREATE_FEE: ERROR INSERTING VALUES !!!!!");
        res.send(
          "CREATE_FEE call " + create_fee_idx + ": ERROR INSERTING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nCREATE_FEE: VALUES INSERTED");
        res.send("CREATE_FEE call " + create_fee_idx + ": VALUES INSERTED");
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

///////////////////////////////////////////
//// Q12: start_overdraft route /////
///////////////////////////////////////////
var start_overdraft_idx = 0;
app.post("/start_overdraft", (req, res) => {
  start_overdraft_idx++;

  const requester = req.body.requester;
  const checking_bankID = req.body.checking_bankID;
  const checking_accountID = req.body.checking_accountID;
  const savings_bankID = req.body.savings_bankID;
  const savings_accountID = req.body.savings_accountID;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("START_OVERDRAFT call " + start_overdraft_idx + "\n");
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "requester: " +
      requester +
      "\n" +
      "checking_bankID: " +
      checking_bankID +
      "\n" +
      "checking_accountID: " +
      checking_accountID +
      "\n" +
      "savings_bankID: " +
      savings_bankID +
      "\n" +
      "savings_accountID: " +
      savings_accountID +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "call start_overdraft(?,?,?,?,?)",
    [
      requester,
      checking_bankID,
      checking_accountID,
      savings_bankID,
      savings_accountID,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("\n!!!!! START_OVERDRAFT: ERROR INSERTING VALUES !!!!!");
        res.send(
          "START_OVERDRAFT call " +
            start_overdraft_idx +
            ": ERROR INSERTING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nSTART_OVERDRAFT: VALUES INSERTED");
        res.send(
          "START_OVERDRAFT call " + start_overdraft_idx + ": VALUES INSERTED"
        );
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

///////////////////////////////////////////
//// Q13: stop_overdraft route /////
///////////////////////////////////////////
var stop_overdraft_idx = 0;
app.post("/stop_overdraft", (req, res) => {
  stop_overdraft_idx++;

  const requester = req.body.requester;
  const checking_bankID = req.body.checking_bankID;
  const checking_accountID = req.body.checking_accountID;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("STOP_OVERDRAFT call " + stop_overdraft_idx + "\n");
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "requester: " +
      requester +
      "\n" +
      "checking_bankID: " +
      checking_bankID +
      "\n" +
      "checking_accountID: " +
      checking_accountID +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "call stop_overdraft(?,?,?)",
    [requester, checking_bankID, checking_accountID],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("\n!!!!! STOP_OVERDRAFT: ERROR INSERTING VALUES !!!!!");
        res.send(
          "STOP_OVERDRAFT call " +
            stop_overdraft_idx +
            ": ERROR INSERTING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nSTOP_OVERDRAFT: VALUES INSERTED");
        res.send(
          "STOP_OVERDRAFT call " + stop_overdraft_idx + ": VALUES INSERTED"
        );
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

///////////////////////////////////////////
//// Q14: account_deposit route /////
///////////////////////////////////////////
var account_deposit_idx = 0;
app.post("/account_deposit", (req, res) => {
  account_deposit_idx++;

  const requester = req.body.requester;
  const deposit_amount = req.body.deposit_amount;
  const bankID = req.body.bankID;
  const accountID = req.body.accountID;
  const dtAction = req.body.dtAction;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("ACCOUNT_DEPOSIT call " + account_deposit_idx + "\n");
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "requester: " +
      requester +
      "\n" +
      "deposit_amount: " +
      deposit_amount +
      "\n" +
      "bankID: " +
      bankID +
      "\n" +
      "accountID: " +
      accountID +
      "\n" +
      "dtAction: " +
      dtAction +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "call account_deposit(?,?,?,?,?)",
    [requester, deposit_amount, bankID, accountID, dtAction],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("\n!!!!! ACCOUNT_DEPOSIT: ERROR INSERTING VALUES !!!!!");
        res.send(
          "ACCOUNT_DEPOSIT call " +
            account_deposit_idx +
            ": ERROR INSERTING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nACCOUNT_DEPOSIT: VALUES INSERTED");
        res.send(
          "ACCOUNT_DEPOSIT call " + account_deposit_idx + ": VALUES INSERTED"
        );
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

///////////////////////////////////////////
//// Q15: account_withdrawal route /////
///////////////////////////////////////////
var account_withdrawal_idx = 0;
app.post("/account_withdrawal", (req, res) => {
  account_withdrawal_idx++;

  const requester = req.body.requester;
  const withdrawal_amount = req.body.withdrawal_amount;
  const bankID = req.body.bankID;
  const accountID = req.body.accountID;
  const dtAction = req.body.dtAction;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("ACCOUNT_WITHDRAWAL call " + account_withdrawal_idx + "\n");
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "requester: " +
      requester +
      "\n" +
      "withdrawal_amount: " +
      withdrawal_amount +
      "\n" +
      "bankID: " +
      bankID +
      "\n" +
      "accountID: " +
      accountID +
      "\n" +
      "dtAction: " +
      dtAction +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "call account_withdrawal(?,?,?,?,?)",
    [requester, withdrawal_amount, bankID, accountID, dtAction],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("\n!!!!! ACCOUNT_WITHDRAWAL: ERROR INSERTING VALUES !!!!!");
        res.send(
          "ACCOUNT_WITHDRAWAL call " +
            account_withdrawal_idx +
            ": ERROR INSERTING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nACCOUNT_WITHDRAWAL: VALUES INSERTED");
        res.send(
          "ACCOUNT_WITHDRAWAL call " +
            account_withdrawal_idx +
            ": VALUES INSERTED"
        );
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

///////////////////////////////////////////
//// Q16: account_transfer route /////
///////////////////////////////////////////
var account_transfer_idx = 0;
app.post("/account_transfer", (req, res) => {
  account_transfer_idx++;

  const requester = req.body.requester;
  const transfer_amount = req.body.transfer_amount;
  const from_bankID = req.body.from_bankID;
  const from_accountID = req.body.from_accountID;
  const to_bankID = req.body.to_bankID;
  const to_accountID = req.body.to_accountID;
  const dtAction = req.body.dtAction;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("ACCOUNT_TRANSFER call " + account_transfer_idx + "\n");
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "requester: " +
      requester +
      "\n" +
      "transfer_amount: " +
      transfer_amount +
      "\n" +
      "from_bankID: " +
      from_bankID +
      "\n" +
      "from_accountID: " +
      from_accountID +
      "\n" +
      "to_bankID: " +
      to_bankID +
      "\n" +
      "to_accountID: " +
      to_accountID +
      "\n" +
      "dtAction: " +
      dtAction +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "call account_transfer(?,?,?,?,?,?,?)",
    [
      requester,
      transfer_amount,
      from_bankID,
      from_accountID,
      to_bankID,
      to_accountID,
      dtAction,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("\n!!!!! ACCOUNT_TRANSFER: ERROR INSERTING VALUES !!!!!");
        res.send(
          "ACCOUNT_TRANSFER call " +
            account_transfer_idx +
            ": ERROR INSERTING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nACCOUNT_TRANSFER: VALUES INSERTED");
        res.send(
          "ACCOUNT_TRANSFER call " + account_transfer_idx + ": VALUES INSERTED"
        );
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

///////////////////////////////////////////
//// Q17: pay_employees route /////
///////////////////////////////////////////
var pay_employees_idx = 0;
app.post("/pay_employees", (req, res) => {
  pay_employees_idx++;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("PAY_EMPLOYEES call " + pay_employees_idx + "\n");

  db.query("call pay_employees()", (err, result) => {
    if (err) {
      console.log(err);
      console.log("\n!!!!! PAY_EMPLOYEES: ERROR UPDATING VALUES !!!!!");
      res.send(
        "PAY_EMPLOYEES call " + pay_employees_idx + ": ERROR UPDATING VALUES"
      );
    } else {
      console.log(result);
      console.log("\nPAY_EMPLOYEES: VALUES UPDATED");
      res.send("PAY_EMPLOYEES call " + pay_employees_idx + ": VALUES UPDATED");
    }
    console.log(
      "/////////////////////////////////////////////////////////////////\n"
    );
  });
});

///////////////////////////////////////////
//// Q18: penalize_accounts route /////
///////////////////////////////////////////
var penalize_accounts_idx = 0;
app.post("/penalize_accounts", (req, res) => {
  penalize_accounts_idx++;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("PENALIZE_ACCOUNTS call " + penalize_accounts_idx + "\n");

  db.query("call penalize_accounts()", (err, result) => {
    if (err) {
      console.log(err);
      console.log("\n!!!!! PENALIZE_ACCOUNTS: ERROR UPDATING VALUES !!!!!");
      res.send(
        "PENALIZE_ACCOUNTS call " +
          penalize_accounts_idx +
          ": ERROR UPDATING VALUES"
      );
    } else {
      console.log(result);
      console.log("\nPENALIZE_ACCOUNTS: VALUES UPDATED");
      res.send(
        "PENALIZE_ACCOUNTS call " + penalize_accounts_idx + ": VALUES UPDATED"
      );
    }
    console.log(
      "/////////////////////////////////////////////////////////////////\n"
    );
  });
});

///////////////////////////////////////////
//// Q19: accrue_interest route /////
///////////////////////////////////////////
var accrue_interest_idx = 0;
app.post("/accrue_interest", (req, res) => {
  accrue_interest_idx++;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("ACCRUE_INTEREST call " + accrue_interest_idx + "\n");

  db.query("call accrue_interest()", (err, result) => {
    if (err) {
      console.log(err);
      console.log("\n!!!!! ACCRUE_INTEREST: ERROR UPDATING VALUES !!!!!");
      res.send(
        "ACCRUE_INTEREST call " +
          accrue_interest_idx +
          ": ERROR UPDATING VALUES"
      );
    } else {
      console.log(result);
      console.log("\nACCRUE_INTEREST: VALUES UPDATED");
      res.send(
        "ACCRUE_INTEREST call " + accrue_interest_idx + ": VALUES UPDATED"
      );
    }
    console.log(
      "/////////////////////////////////////////////////////////////////\n"
    );
  });
});

///////////////////////////////////////////
//// Q20: display_account_stats ////
///////////////////////////////////////////
app.get("/display_account_stats", (req, res) => {
  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  db.query("select * from display_account_stats", (err, result) => {
    if (err) {
      console.log(err);
      console.log(
        "\n!!!!! DISPLAY_ACCOUNT_STATS: ERROR RETRIEVING VALUES !!!!!"
      );
    } else {
      console.log("\nDISPLAY_ACCOUNT_STATS: VALUES RETRIEVED");
      console.log(result);
      res.send(result);
    }
    console.log(
      "/////////////////////////////////////////////////////////////////\n"
    );
  });
});

///////////////////////////////////////////
//// Q21: display_bank_stats ////
///////////////////////////////////////////
app.get("/display_bank_stats", (req, res) => {
  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  db.query("select * from display_bank_stats", (err, result) => {
    if (err) {
      console.log(err);
      console.log("\n!!!!! DISPLAY_BANK_STATS: ERROR RETRIEVING VALUES !!!!!");
    } else {
      console.log("\nDISPLAY_BANK_STATS: VALUES RETRIEVED");
      console.log(result);
      res.send(result);
    }
    console.log(
      "/////////////////////////////////////////////////////////////////\n"
    );
  });
});

///////////////////////////////////////////
//// Q22: display_corporation_stats ////
///////////////////////////////////////////
app.get("/display_corporation_stats", (req, res) => {
  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  db.query("select * from display_corporation_stats", (err, result) => {
    if (err) {
      console.log(err);
      console.log(
        "\n!!!!! DISPLAY_CORPORATION_STATS: ERROR RETRIEVING VALUES !!!!!"
      );
    } else {
      console.log("\nDISPLAY_CORPORATION_STATS: VALUES RETRIEVED");
      console.log(result);
      res.send(result);
    }
    console.log(
      "/////////////////////////////////////////////////////////////////\n"
    );
  });
});

///////////////////////////////////////////
//// Q23: display_customer_stats ////
///////////////////////////////////////////
app.get("/display_customer_stats", (req, res) => {
  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  db.query("select * from display_customer_stats", (err, result) => {
    if (err) {
      console.log(err);
      console.log(
        "\n!!!!! DISPLAY_CUSTOMER_STATS: ERROR RETRIEVING VALUES !!!!!"
      );
    } else {
      console.log("\nDISPLAY_CUSTOMER_STATS: VALUES RETRIEVED");
      console.log(result);
      res.send(result);
    }
    console.log(
      "/////////////////////////////////////////////////////////////////\n"
    );
  });
});

///////////////////////////////////////////
//// Q24: display_employee_stats ////
///////////////////////////////////////////
app.get("/display_employee_stats", (req, res) => {
  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  db.query("select * from display_employee_stats", (err, result) => {
    if (err) {
      console.log(err);
      console.log(
        "\n!!!!! DISPLAY_EMPLOYEE_STATS: ERROR RETRIEVING VALUES !!!!!"
      );
    } else {
      console.log("\nDISPLAY_EMPLOYEE_STATS: VALUES RETRIEVED");
      console.log(result);
      res.send(result);
    }
    console.log(
      "/////////////////////////////////////////////////////////////////\n"
    );
  });
});

// H1
//Gets Employee ID for banks
app.get("/get_employee_id", (req, res) => {
  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  db.query(
    "select perID from employee " +
      "where perID not in (select perID from system_admin)" +
      "and perID not in (select manager from bank)",
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("\n!!!!! GET_EMPLOYEE_ID: ERROR RETRIEVING VALUES !!!!!");
      } else {
        console.log("\nGET_EMPLOYEE_ID: VALUES RETRIEVED");
        console.log(result);
        res.send(result);
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

// H2
//Gets Corporation IDS
app.get("/get_corp_ids", (req, res) => {
  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  db.query("select corpID from corporation ", (err, result) => {
    if (err) {
      console.log(err);
      console.log("\n!!!!! GET_CORP_IDS: ERROR RETRIEVING VALUES !!!!!");
      res.send(error);
    } else {
      console.log("\nGET_CORP_IDS: VALUES RETRIEVED");
      console.log(result);
      res.send(result);
    }
    console.log(
      "/////////////////////////////////////////////////////////////////\n"
    );
  });
});

// H3
//Gets available managers
app.get("/get_available_manager_ids", (req, res) => {
  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  db.query(
    "select perID from employee " +
      "where perID not in (select perID from system_admin) " +
      "and perID not in (select manager from bank)" +
      "and perID not in (select perID from workFor)",
    (err, result) => {
      if (err) {
        console.log(err);
        console.log(
          "\n!!!!! GET_AVAILABLE_MANAGER_IDS: ERROR RETRIEVING VALUES !!!!!"
        );
      } else {
        console.log("\nGET_AVAILABLE_MANAGER_IDS: VALUES RETRIEVED");
        console.log(result);
        res.send(result);
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

// H4
// Check person role in database provided perID and password
// Inputs: varchar perID, varchar pwd
// Returns: 'admin', 'customer', 'employee', 'double' (employee and customer at the same time), 'NA' (not found in databse)
var check_per_type_idx = 0;
app.post("/check_per_type", (req, res) => {
  check_per_type_idx++;

  const perID = req.body.perID;
  const pwd = req.body.pwd;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("CHECK_PER_TYPE call " + check_per_type_idx + "\n");
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "perID: " +
      perID +
      "\n" +
      "pwd: " +
      pwd +
      "\n" +
      "--------------------------\n"
  );

  db.query("select check_per_type(?,?);", [perID, pwd], (err, result) => {
    if (err) {
      console.log(err);
      console.log("\n!!!!! CHECK_PER_TYPE: ERROR CHECKING !!!!!");
      res.send(
        "CHECK_PER_TYPE call " + check_per_type_idx + ": ERROR CHECKING"
      );
    } else {
      console.log(result);
      console.log("\nCHECK_PER_TYPE: SUCCESSFUL");
      res.send(result);
    }
    console.log(
      "/////////////////////////////////////////////////////////////////\n"
    );
  });
});

// H5
// Get customers IDs
app.get("/get_customer_IDs", (req, res) => {
  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  db.query("select perID from customer;", (err, result) => {
    if (err) {
      console.log(err);
      console.log("\n!!!!! GET_CUSTOMER_IDS: ERROR RETRIEVING VALUES !!!!!");
    } else {
      console.log("\nGET_CUSTOMER_IDS: VALUES RETRIEVED");
      console.log(result);
      res.send(result);
    }
    console.log(
      "/////////////////////////////////////////////////////////////////\n"
    );
  });
});

// H6
// Get bank IDs
app.get("/get_bank_IDs", (req, res) => {
  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  db.query("select bankID from bank;", (err, result) => {
    if (err) {
      console.log(err);
      console.log("\n!!!!! GET_BANK_IDS: ERROR RETRIEVING VALUES !!!!!");
    } else {
      console.log("\nGET_BANK_IDS: VALUES RETRIEVED");
      console.log(result);
      res.send(result);
    }
    console.log(
      "/////////////////////////////////////////////////////////////////\n"
    );
  });
});

// H7
// Get accessible accounts
var get_accessible_accounts_idx = 0;
app.post("/get_accessible_accounts", (req, res) => {
  get_accessible_accounts_idx++;

  const customerID = req.body.customerID;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log(
    "GET_ACCESSIBLE_ACCOUNTS call " + get_accessible_accounts_idx + "\n"
  );
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "customerID: " +
      customerID +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "select bankID, accountID from access where perID = ?;",
    [customerID],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log(
          "\n!!!!! GET_ACCESSIBLE_ACCOUNTS: ERROR RETRIEVING VALUES !!!!!"
        );
        res.send(
          "GET_ACCESSIBLE_ACCOUNTS call " +
            get_accessible_accounts_idx +
            ": ERROR RETRIEVING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nGET_ACCESSIBLE_ACCOUNTS: SUCCESSFUL");
        res.send(result);
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

// H8
// Get account owners
var get_account_owners_idx = 0;
app.post("/get_account_owners", (req, res) => {
  get_account_owners_idx++;

  const bankID = req.body.bankID;
  const accountID = req.body.accountID;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("GET_ACCOUNT_OWNERS call " + get_account_owners_idx + "\n");
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "bankID: " +
      bankID +
      "\n" +
      "accountID: " +
      accountID +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "select perID from access where bankID = ? and accountID = ?;",
    [bankID, accountID],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log(
          "\n!!!!! GET_ACCOUNT_OWNERS: ERROR RETRIEVING VALUES !!!!!"
        );
        res.send(
          "GET_ACCOUNT_OWNERS call " +
            get_account_owners_idx +
            ": ERROR RETRIEVING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nGET_ACCOUNT_OWNERS: SUCCESSFUL");
        res.send(result);
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

// H9
// Get accessible checking accounts
var get_accessible_chk_accounts_idx = 0;
app.post("/get_accessible_chk_accounts", (req, res) => {
  get_accessible_chk_accounts_idx++;

  const customerID = req.body.customerID;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log(
    "GET_ACCESSIBLE_CHK_ACCOUNTS call " + get_accessible_chk_accounts_idx + "\n"
  );
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "customerID: " +
      customerID +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "select bankID, accountID from access where perID = ? and (bankID, accountID) in (select bankID, accountID from checking);",
    [customerID],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log(
          "\n!!!!! GET_ACCESSIBLE_CHK_ACCOUNTS: ERROR RETRIEVING VALUES !!!!!"
        );
        res.send(
          "GET_ACCESSIBLE_CHK_ACCOUNTS call " +
            get_accessible_chk_accounts_idx +
            ": ERROR RETRIEVING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nGET_ACCESSIBLE_CHK_ACCOUNTS: SUCCESSFUL");
        res.send(result);
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

// H10
// Get accessible savings accounts
var get_accessible_sav_accounts_idx = 0;
app.post("/get_accessible_sav_accounts", (req, res) => {
  get_accessible_sav_accounts_idx++;

  const customerID = req.body.customerID;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log(
    "GET_ACCESSIBLE_SAV_ACCOUNTS call " + get_accessible_sav_accounts_idx + "\n"
  );
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "customerID: " +
      customerID +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "select bankID, accountID from access where perID = ? and (bankID, accountID) in (select bankID, accountID from savings);",
    [customerID],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log(
          "\n!!!!! GET_ACCESSIBLE_SAV_ACCOUNTS: ERROR RETRIEVING VALUES !!!!!"
        );
        res.send(
          "GET_ACCESSIBLE_SAV_ACCOUNTS call " +
            get_accessible_sav_accounts_idx +
            ": ERROR RETRIEVING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nGET_ACCESSIBLE_SAV_ACCOUNTS: SUCCESSFUL");
        res.send(result);
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

// H11
// Get persons in the database
var get_perID_idx = 0;
app.get("/get_perID", (req, res) => {
  get_perID_idx++;
  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("GET_PERID call " + get_perID_idx + "\n");
  db.query("select perID, pwd from person;", (err, result) => {
    if (err) {
      console.log(err);
      console.log("\n!!!!! GET_PERID: ERROR RETRIEVING VALUES !!!!!");
      res.send("GET_PERID call " + get_perID_idx + ": ERROR RETRIEVING VALUES");
    } else {
      console.log(result);
      console.log("\nGET_PERID: SUCCESSFUL");
      res.send(result);
    }
    console.log(
      "/////////////////////////////////////////////////////////////////\n"
    );
  });
});

// H12
// Get accounts from a specific bank
var get_acc_from_bank_idx = 0;
app.post("/get_acc_from_bank", (req, res) => {
  get_acc_from_bank_idx++;

  const bankID = req.body.bankID;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("GET_ACC_FROM_BANK call " + get_acc_from_bank_idx + "\n");
  console.log(
    "Received Data\n" +
      "--------------------------\n" +
      "bankID: " +
      bankID +
      "\n" +
      "--------------------------\n"
  );

  db.query(
    "select accountID from bank_account where bankID = ?;",
    [bankID],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("\n!!!!! GET_ACC_FROM_BANK: ERROR RETRIEVING VALUES !!!!!");
        res.send(
          "GET_ACC_FROM_BANK call " +
            get_acc_from_bank_idx +
            ": ERROR RETRIEVING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nGET_ACC_FROM_BANK: SUCCESSFUL");
        res.send(result);
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

// H13
// Get all accounts
var get_all_acc = 0;
app.get("/get_all_acc", (req, res) => {
  get_all_acc++;
  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("GET_ALL_ACC call " + get_all_acc + "\n");

  db.query("select * from bank_account;", (err, result) => {
    if (err) {
      console.log(err);
      console.log("\n!!!!! GET_ACC_FROM_BANK: ERROR RETRIEVING VALUES !!!!!");
      res.send(
        "GET_ACC_FROM_BANK call " + get_all_acc + ": ERROR RETRIEVING VALUES"
      );
    } else {
      console.log(result);
      console.log("\nGET_ACC_FROM_BANK: SUCCESSFUL");
      res.send(result);
    }
    console.log(
      "/////////////////////////////////////////////////////////////////\n"
    );
  });
});

// H14
// Get IDs and passwords for non-employees
var get_non_employees_idx = 0;
app.get("/get_non_employees", (req, res) => {
  get_non_employees_idx++;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("get_non_employees call " + get_non_employees_idx + "\n");
  db.query(
    "select perID, pwd from person where perID not in (select perID from employee) and perID not in (select * from system_admin);",
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("\n!!!!! get_non_employees: ERROR RETRIEVING VALUES !!!!!");
        res.send(
          "get_non_employees call " +
            get_non_employees_idx +
            ": ERROR RETRIEVING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nget_non_employees: SUCCESSFUL");
        res.send(result);
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

// H15
// Get IDs for non-customers 
var get_non_customers_idx = 0;
app.get("/get_non_customers", (req, res) => {
  get_non_customers_idx++;

  console.log(
    "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("get_non_customers call " + get_non_customers_idx + "\n");
  db.query(
    "select perID from person where perID not in (select perID from customer) and perID not in (select * from system_admin);",
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("\n!!!!! get_non_customers: ERROR RETRIEVING VALUES !!!!!");
        res.send(
          "get_non_customers call " +
            get_non_customers_idx +
            ": ERROR RETRIEVING VALUES"
        );
      } else {
        console.log(result);
        console.log("\nget_non_customers: SUCCESSFUL");
        res.send(result);
      }
      console.log(
        "/////////////////////////////////////////////////////////////////\n"
      );
    }
  );
});

// H16
// Get all checking accounts with their overdraft protection status
// Returns (bankID, accountID, protectionBank, protectionAccount)
var get_all_chk_w_status_idx = 0;
app.get("/get_all_chk_w_status", (req, res) => {
  get_all_chk_w_status_idx++;

  console.log("\n/////////////////////////////////////////////////////////////////");
  console.log("GET_ALL_CHK_W_STATUS call " + get_all_chk_w_status_idx + "\n");
  db.query(
    "select bankID, accountID, protectionBank, protectionAccount from checking;",
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("\n!!!!! GET_ALL_CHK_W_STATUS: ERROR RETRIEVING VALUES !!!!!");
        res.send("GET_ALL_CHK_W_STATUS call " + get_all_chk_w_status_idx + ": ERROR RETRIEVING VALUES");
      } else {
        console.log(result);
        console.log("\nGET_ALL_CHK_W_STATUS: SUCCESSFUL");
        res.send(result);
      }
      console.log("/////////////////////////////////////////////////////////////////\n");
    }
  );
});

// H17
// Get all savings accounts
// Returns (bankID, accountID)
var get_all_sav_idx = 0;
app.get("/get_all_sav", (req, res) => {
  get_all_sav_idx++;

  console.log("\n/////////////////////////////////////////////////////////////////");
  console.log("GET_ALL_SAV call " + get_all_sav_idx + "\n");
  db.query(
    "select bankID, accountID from savings;",
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("\n!!!!! GET_ALL_SAV: ERROR RETRIEVING VALUES !!!!!");
        res.send("GET_ALL_SAV call " + get_all_sav_idx + ": ERROR RETRIEVING VALUES");
      } else {
        console.log(result);
        console.log("\nGET_ALL_SAV: SUCCESSFUL");
        res.send(result);
      }
      console.log("/////////////////////////////////////////////////////////////////\n");
    }
  );
});

// H18
// Get accessible checking accounts with their overdraft protection status
// Returns (bankID, accountID, protectionBank, protectionAccount)
var get_accessible_chk_w_status_idx = 0;
app.post("/get_accessible_chk_w_status", (req, res) => {
  get_accessible_chk_w_status_idx++;

  const customerID = req.body.customerID;

  console.log("\n/////////////////////////////////////////////////////////////////"
  );
  console.log("GET_ACCESSIBLE_CHK_W_STATUS call " + get_accessible_chk_w_status_idx + "\n");
  console.log(
      "Received Data\n" +
      "--------------------------\n" +
      "customerID: " + customerID + "\n" +
      "--------------------------\n"
  );

  db.query(
    "select x.bankID, x.accountID, checking.protectionBank, checking.protectionAccount from (select bankID, accountID from access where perID = ? and (bankID, accountID) in (select bankID, accountID from checking)) as x left join checking on x.bankID = checking.bankID and x.accountID = checking.accountID;",
    [customerID],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("\n!!!!! GET_ACCESSIBLE_CHK_W_STATUS: ERROR RETRIEVING VALUES !!!!!");
        res.send("GET_ACCESSIBLE_CHK_W_STATUS call " + get_accessible_chk_w_status_idx + ": ERROR RETRIEVING VALUES");
      } else {
        console.log(result);
        console.log("\nGET_ACCESSIBLE_CHK_W_STATUS: SUCCESSFUL");
        res.send(result);
      }
      console.log("/////////////////////////////////////////////////////////////////\n");
    }
  );
});


app.get("/get_stop_customer_IDs", (req, res) => {
  console.log(
      "\n/////////////////////////////////////////////////////////////////"
  );
  db.query("select perID from customer where not perID in " +
      "(select access.perID from access where accountID in " +
      "(select accountID from access " +
      "group by accountID having count(perID) = 1));", (err, result) => {
    if (err) {
      console.log(err);
      console.log("\n!!!!! get_stop_customer_IDs: ERROR RETRIEVING VALUES !!!!!");
    } else {
      console.log("\nget_stop_customer_IDs: VALUES RETRIEVED");
      console.log(result);
      res.send(result);
    }
    console.log(
        "/////////////////////////////////////////////////////////////////\n"
    );
  });
});

var get_interest_bearing = 0;
app.get("/get_interest_bearing", (req, res) => {
  get_all_acc++;
  console.log(
      "\n/////////////////////////////////////////////////////////////////"
  );
  console.log("get_interest_bearing call " + get_all_acc + "\n");

  db.query("select * from interest_bearing;", (err, result) => {
    if (err) {
      console.log(err);
      console.log("\n!!!!! get_interest_bearing: ERROR RETRIEVING VALUES !!!!!");
      res.send(
          "get_interest_bearing call " + get_all_acc + ": ERROR RETRIEVING VALUES"
      );
    } else {
      console.log(result);
      console.log("\nget_interest_bearing: SUCCESSFUL");
      res.send(result);
    }
    console.log(
        "/////////////////////////////////////////////////////////////////\n"
    );
  });
});


app.listen(3001, () => {
  console.log("Server running on port 3001 ...");
});
