import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import { useLocation } from "react-router-dom";
import "../styles/main.css";
import "../styles/forms.css";

export function CreateFee() {
  const [accountList, setAccountList] = useState([])
  const [account, setAccount] = useState("")
  const [feeType, setFeeType] = useState("")

  const location = useLocation()
  const username = location.state['username']

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
  }, [username])

  function handleAccountChange(event) {
    setAccount(event.target.value)
  }
  function handleFeeTypeChange(event) {
    setFeeType(event.target.value)
  }

  function clearState(event) {
    console.log('cleared')
    setFeeType("")
    setAccount("")
    event.preventDefault();
  }

  function handleSubmit(event) {
    const accountArray = account.split(": ")
    const bankID = accountArray[0]
    const accountID = accountArray[1]
    Axios.post("http://localhost:3001/create_fee", {
      bankID: bankID,
      accountID: accountID,
      fee_type: feeType,
    }).then(() => {
      console.log("Create fee data sent!");
      clearState(event)
    })
    event.preventDefault();
  }

  return (
    <div className="container">
      <div className="mainHeader">
        <h6><Link to="../">Home</Link></h6>
        <h1>Q11: Create Fee</h1>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="formItem">
            <label>
              Account:
            </label>
            <select name="selectList" id="selectList" onChange={handleAccountChange}>
              {accountList.map(account => <option key={account} value={account}>{account}</option>)}
            </select>
          </div>
          <div className="formItem">
            <label>
              Fee Type:
            </label>
            <input type="text" value={feeType} onChange={handleFeeTypeChange} />
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