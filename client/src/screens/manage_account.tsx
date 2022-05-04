import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from 'axios';
import moment from "moment";
import "../styles/main.css";
import "../styles/forms.css";

// FOR ADMIN USE
export function ManageAccount() {
  const location = useLocation()
  const username = location.state['username']
  // ADD ACCOUNT ACCESS
  const [customerList, setCustomerList] = useState<Array<string>>([])
  const [customer, setCustomer] = useState("")
  const [accountList, setAccountList] = useState<Array<string>>([]);
  const [account, setAccount] = useState("")
  const ownerList = ["Add Access", "Remove Access"]
  const [addOwner, setAddOwner] = useState(ownerList[0])
  // CREATE ACCOUNT
  const [bank, setBank] = useState("")
  const [bankList, setBankList] = useState<Array<string>>([])
  const [customer2, setCustomer2] = useState("")
  const [newAccountID, setNewAccountID] = useState("")
  const accountTypeList = ["checking", "savings", "market"]
  const [accountType, setAccountType] = useState(accountTypeList[0])
  const [balance, setBalance] = useState(0)
  const [minBalance, setMinBalance] = useState(0)
  const [interest, setInterest] = useState(0.0)
  const [maxWithdrawal, setMaxWithdrawal] = useState(0)
  // EXTRA
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    console.log(username)
    let data = []
    Axios.get("http://localhost:3001/get_all_acc").then(r => {
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
      setCustomer2(data[0])
    })
    Axios.get("http://localhost:3001/get_bank_IDs").then(r => {
      data = r.data;
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].bankID;
      }
      setBankList(data)
      setBank(data[0])
    })
  }, [username, location, refresh])

  function handleAccountChange(event) {
    setAccount(event.target.value)
  }
  function handleCustomerChange(event) {
    setCustomer(event.target.value)
  }
  function handleCustomer2Change(event) {
    setCustomer2(event.target.value)
  }
  function handleAddOwnerChange(event) {
    setAddOwner(event.target.value);
  }
  function handleBankChange(event) {
    setBank(event.target.value);
  }
  function handleAccountIDChange(event) {
    setNewAccountID(event.target.value);
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

  function clearAddAccountState(event) {
    setAddOwner(ownerList[0])
    event.preventDefault();
  }

  function clearCreateAccountState(event) {
    setNewAccountID("")
    setBalance(0)
    setMaxWithdrawal(0)
    setMinBalance(0)
    setInterest(0)
  }

  function handleAddAccountSubmit(event) {
    const date = moment().format("YYYY-MM-DD");
    let accountArray = account.split(": ")
    const bankID = accountArray[0]
    const accountID = accountArray[1]
    if (addOwner === ownerList[0]) {
      console.log("Adding account access to " + accountID)
      Axios.post("http://localhost:3001/add_account_access", {
        requester: username,
        customer: customer,
        bankID: bankID,
        accountID: accountID,
        dtShareStart: date,
      }).then(() => {
        clearAddAccountState(event)
        setRefresh(refresh + 1)
      })
    } else {
      console.log("Removing account access from " + accountID)
      Axios.post("http://localhost:3001/remove_account_access", {
        requester: username,
        sharer: customer,
        bankID: bankID,
        accountID: accountID,
        dtShareStart: date,
      }).then(() => {
        clearAddAccountState(event)
        setRefresh(refresh + 1)
      })
    }
    event.preventDefault();
  }

  function handleCreateAccountSubmit(event) {
    const date = moment().format("YYYY-MM-DD");
    console.log("Creating account for " + customer2)
    Axios.post("http://localhost:3001/add_account_access", {
      requester: username,
      customer: customer2,
      bankID: bank,
      accountID: newAccountID,
      account_type: accountType,
      balance: balance,
      interest_rate: interest,
      dtDeposit: date,
      minBalance: minBalance,
      numWithdrawals: 0,
      maxWithdrawals: maxWithdrawal,
      dtShareStart: date,
    }).then(() => {
      clearCreateAccountState(event)
      setRefresh(refresh + 1)
    })
    event.preventDefault();
  }

  return (
    <div className="container">
      <div className="mainHeader">
        <h6><Link to="../">Home</Link></h6>
        <h1>Q9.2: Manage Accounts</h1>
        <p className="currentUser">{username}</p>
      </div>
      <div className="formContainer">
        <form onSubmit={handleAddAccountSubmit}>
          <div className="formItem">
            <h4>Add access to existing account</h4>
            <label>
              Account:
            </label>
            <select name="selectList" id="selectList" value={account} onChange={handleAccountChange}>
              {accountList.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
          <div className="formItem">
            <label>
              Customer:
            </label>
            <select name="selectList" id="selectList" value={customer} onChange={handleCustomerChange}>
              {customerList.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
          <div className="formItem">
            <label>
              Add or Remove Access:
            </label>
            <select name="selectList" id="selectList" value={addOwner} onChange={handleAddOwnerChange}>
              {ownerList.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
          <div className="formButtons">
            <button onClick={clearAddAccountState} className="formCancel">
              Cancel
            </button>
            <button onClick={handleAddAccountSubmit} className="formSubmit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <br />
      <h4>OR</h4>
      <div className="formContainer">
        <form onSubmit={handleCreateAccountSubmit}>
          <div className="formItem">
            <label>
              Bank:
            </label>
            <select name="selectList" id="selectList" value={bank} onChange={handleBankChange}>
              {bankList.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
          <div className="formItem">
            <label>
              Customer:
            </label>
            <select name="selectList" id="selectList" value={customer2} onChange={handleCustomer2Change}>
              {customerList.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
          <div className="formItem">
            <label>
              Account ID:
            </label>
            <input type="text" value={newAccountID} onChange={handleAccountIDChange} />
          </div>
          <div className="formItem">
            <label>
              Account Type:
            </label>
            <select name="selectList" id="selectList" value={accountType} onChange={handleAccountTypeChange}>
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
            <button onClick={clearCreateAccountState} className="formCancel">
              Cancel
            </button>
            <button onClick={handleCreateAccountSubmit} className="formSubmit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}