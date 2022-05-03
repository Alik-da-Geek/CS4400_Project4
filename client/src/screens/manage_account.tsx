import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from 'axios';
import moment from "moment";
import "../styles/main.css";
import "../styles/forms.css";

export function ManageAccount() {
  const location = useLocation()
  const username = location.state['username']
  const [customerList, setCustomerList] = useState<Array<string>>([])
  const [customer, setCustomer] = useState("")
  const [accountList, setAccountList] = useState<Array<string>>([]);
  const [account, setAccount] = useState("")
  const [addOwner, setAddOwner] = useState(true)
  const [bank, setBank] = useState("")
  const [bankList, setBankList] = useState<Array<string>>([])
  const [accountID, setAccountID] = useState("")
  const accountTypeList = ["checking", "savings", "market"]
  const [accountType, setAccountType] = useState(accountTypeList[0])
  const [balance, setBalance] = useState(0)
  const [minBalance, setMinBalance] = useState(0)
  const [interest, setInterest] = useState(0.0)
  const [maxWithdrawal, setMaxWithdrawal] = useState(0)

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
    Axios.get("http://localhost:3001/get_customer_IDs").then(r => {
      data = r.data;
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].perID;
      }
      setCustomerList(data)
      setCustomer(data[0])
    })
    Axios.get("http://localhost:3001/get_bank_IDs").then(r => {
      data = r.data;
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].bankID;
      }
      setBankList(data)
      setBank(data[0])
    })
  }, [username, location])

  function handleAccountChange(event) {
    setAccount(event.target.value)
  }
  function handleCustomerChange(event) {
    setCustomer(event.target.value)
  }
  function handleAddOwnerChange(event) {
    setAddOwner(!addOwner);
  }

  function handleBankChange(event) {
    setBank(event.target.value);
  }
  function handleAccountIDChange(event) {
    setAccountID(event.target.value);
  }
  function handleAccountTypeChange(event) {
    setAccountType(event.target.value);
  }
  function handleBalanceChange(event) {
    setBalance(event.target.value);
  }
  function handleInterestChange(event) {
    setInterest(event.target.value);
  }
  function handleMaxWithdrawal(event) {
    setMaxWithdrawal(event.target.value);
  }
  function handleMinBalance(event) {
    setMinBalance(event.target.value);
  }

  function clearState(event) {
    console.log('cleared')
    setAccount(accountList[0])
    setCustomer(customerList[0])
    setAddOwner(true)
    setBank(bankList[0])
    setAccountID("")
    setAccountType(accountTypeList[0])
    setBalance(0)
    setMaxWithdrawal(0)
    setMinBalance(0)
    setInterest(0)
    event.preventDefault();
  }

  function handleSubmit(event) {
    const date = moment().format("YYYY-MM-DD");
    let accountArray = account.split(": ")
    const bankID = accountArray[0]
    const accountID = accountArray[1]
    if (addOwner) {
      Axios.post("http://localhost:3001/add_account_access", {
        requester: username,
        customer: customer,
        bankID: bank,
        accountID: accountID,
        account_type: accountType,
        balance: balance,
        interest_rate: interest,
        dtDeposit: date,
        minBalance: minBalance,
        numWithdawals: 0,
        maxWithdawals: maxWithdrawal,
        dtShareStart: date,
      }).then(() => {
        console.log("Created account!");
      })
    } else {

    }

    clearState(event)
    event.preventDefault();
  }

  return (
    <div className="container">
      <div className="mainHeader">
        <h6><Link to="../">Home</Link></h6>
        <h1>Q9.2: Manage Accounts</h1>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="formItem">
            <h4>Add access to existing account</h4>
            <label>
              Account:
            </label>
            <select name="selectList" id="selectList" onChange={handleAccountChange}>
              {accountList.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
          <div className="formItem">
            <label>
              Customer:
            </label>
            <select name="selectList" id="selectList" onChange={handleCustomerChange}>
              {customerList.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
          <div className="formItem">
            <label>
              Add Owner:
            </label>
            <input type="checkbox" id="addOwner" checked={addOwner} onChange={handleAddOwnerChange} />
          </div>
          <br />
          {/* <div className="formItem">
            <label>
              OR
            </label>
          </div> */}
          <h4>OR create new account</h4>
          <div className="formItem">
            <label>
              Bank:
            </label>
            <select name="selectList" id="selectList" onChange={handleBankChange}>
              {bankList.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
          <div className="formItem">
            <label>
              Account ID:
            </label>
            <input type="text" value={accountID} onChange={handleAccountIDChange} />
          </div>
          <div className="formItem">
            <label>
              Account Type:
            </label>
            <select name="selectList" id="selectList" onChange={handleAccountTypeChange}>
              {accountTypeList.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
          <div className="formItem">
            <label>
              Initial Balance:
            </label>
            <input type="text" value={balance} onChange={handleBalanceChange} />
          </div>
          <div className="formItem">
            <label>
              Minimum Balance:
            </label>
            <input type="text" value={minBalance} onChange={handleMinBalance} />
          </div>
          <div className="formItem">
            <label>
              Interest Rate:
            </label>
            <input type="text" value={interest} onChange={handleInterestChange} />
          </div>
          <div className="formItem">
            <label>
              Max Withdrawals:
            </label>
            <input type="text" value={maxWithdrawal} onChange={handleMaxWithdrawal} />
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