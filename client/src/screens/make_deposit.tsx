import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from 'axios';
import moment from "moment";
import "../styles/main.css";
import "../styles/forms.css";

export function MakeDeposit() {
  const location = useLocation()
  const username = location.state['username']
  const [amount, setAmount] = useState(0);
  const [accountList, setAccountList] = useState<Array<string>>([])
  const [account, setAccount] = useState<string>("")

  useEffect(() => {
    console.log(username)
    let data = []
    Axios.post("http://localhost:3001/get_accessible_accounts", {
      customerID: username
    }).then(r => {
      data = r.data;
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].bankID + ": " + data[i].accountID;
      }
      setAccountList(data)
      setAccount(data[0])
    })
  }, [username, location])

  function handleAccountChange(event) {
    setAccount(event.target.value);
  }
  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  function clearState(event) {
    console.log('cleared')
    setAccount("")
    setAmount(0)
    event.preventDefault();
  }

  function handleSubmit(event) {
    const date = moment().format("DD-MM-YYYY")
    const accountArray = account.split(": ")
    const bankID = accountArray[0]
    const accountID = accountArray[1]
    console.log(bankID)
    console.log(accountID)
    Axios.post("http://localhost:3001/account_deposit", {
      requester: username,
      depositAmount: amount,
      bankID: bankID,
      accountID: accountID,
      dtAction: date
    }).then(() => {
      console.log("Account deposit data sent!");
      clearState(event)
    })
    event.preventDefault();
  }

  return (
    <div className="container">
      <div className="mainHeader">
        <h6><Link to="../">Home</Link></h6>
        <h1>Q14: Make Deposit</h1>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="formItem">
            <label>
              Amount:
            </label>
            <input type="text" value={amount} onChange={handleAmountChange} />
          </div>
          <div className="formItem">
            <label>
              Account:
            </label>
            <select name="selectList" id="selectList" onChange={handleAccountChange}>
              {accountList.map(name => <option key={name} value={name}>{name}</option>)}
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