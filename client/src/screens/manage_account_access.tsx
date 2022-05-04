import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from 'axios';
import moment from "moment";
import "../styles/main.css";
import "../styles/forms.css";

// FOR CUSTOMER USE
export function ManageAccountAccess() {
  const location = useLocation()
  const username = location.state['username']
  const [customerList, setCustomerList] = useState<Array<string>>([])
  const [customer, setCustomer] = useState("")
  const [accountList, setAccountList] = useState<Array<string>>([]);
  const [account, setAccount] = useState("")
  const ownerList = ["Add Access", "Remove Access"]
  const [addOwner, setAddOwner] = useState(ownerList[0])
  const [refresh, setRefresh] = useState(0)

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
  }, [username, location, refresh])

  function handleAccountChange(event) {
    setAccount(event.target.value)
  }
  function handleCustomerChange(event) {
    setCustomer(event.target.value)
  }
  function handleAddOwnerChange(event) {
    setAddOwner(event.target.value);
  }

  function clearState(event) {
    setAddOwner(ownerList[0])
    event.preventDefault();
  }

  function handleSubmit(event) {
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
        clearState(event)
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
        clearState(event)
        setRefresh(refresh + 1)
      })
    }
    event.preventDefault();
  }

  return (
    <div className="container">
      <div className="mainHeader">
        <h6><Link to="../">Home</Link></h6>
        <h1>Q9: Manage Account Access</h1>
        <p className="currentUser">{username}</p>

      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="formItem">
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