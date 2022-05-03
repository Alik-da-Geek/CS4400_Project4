import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import "../styles/main.css";
import "../styles/forms.css";

export function MakeTransfer() {
  const location = useLocation();
  const username = location.state["username"];
  const [amount, setAmount] = useState(0);
  const [accountList, setAccountList] = useState<Array<string>>([]);
  const [withdrawAccount, setWithdrawAccount] = useState<string>("");
  const [depositAccount, setDepositAccount] = useState<string>("");

  useEffect(() => {
    console.log(username);
    let data = [];
    Axios.post("http://localhost:3001/get_accessible_accounts", {
      customerID: username,
    }).then((r) => {
      data = r.data;
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].bankID + ": " + data[i].accountID;
      }
      setAccountList(data);
      setDepositAccount(data[0]);
      setWithdrawAccount(data[0]);
    });
  }, [username, location]);

  function handleWithdrawAccountChange(event) {
    setWithdrawAccount(event.target.value);
  }
  function handleDepositAccountChange(event) {
    setDepositAccount(event.target.value);
  }
  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  function clearState(event) {
    console.log("cleared");
    setAmount(0);
    setWithdrawAccount("");
    setDepositAccount("");
    event.preventDefault();
  }

  function handleSubmit(event) {
    const date = moment().format("YYYY-MM-DD");
    let accountArray = withdrawAccount.split(": ");
    const withdrawBankID = accountArray[0];
    const withdrawAccountID = accountArray[1];
    accountArray = depositAccount.split(": ");
    const depositBankID = accountArray[0];
    const depositAccountID = accountArray[1];

    Axios.post("http://localhost:3001/account_transfer", {
      requester: username,
      transfer_amount: amount,
      from_bankID: withdrawBankID,
      from_accountID: withdrawAccountID,
      to_bankID: depositBankID,
      to_accountID: depositAccountID,
      dtAction: date,
    }).then(() => {
      console.log("Transfer data sent!");
      clearState(event);
    });
    event.preventDefault();
  }

  return (
    <div className="container">
      <div className="mainHeader">
        <h6>
          <Link to="../">Home</Link>
        </h6>
        <h1>Q16: Make Tranfer</h1>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="formItem">
            <label>Amount:</label>
            <input type="text" value={amount} onChange={handleAmountChange} />
          </div>
          <div className="formItem">
            <label>From Account:</label>
            <select
              name="selectList"
              id="selectList"
              onChange={handleWithdrawAccountChange}
            >
              {accountList.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="formItem">
            <label>To Account:</label>
            <select
              name="selectList"
              id="selectList"
              onChange={handleDepositAccountChange}
            >
              {accountList.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="formButtons">
            <button onClick={clearState} className="formCancel">
              Cancel
            </button>
            <button onClick={handleSubmit} className="formSubmit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
