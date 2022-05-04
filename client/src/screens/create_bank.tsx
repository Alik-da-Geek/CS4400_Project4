import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import "../styles/main.css";
import "../styles/forms.css";

export default function CreateBank() {
  const [bankID, setBankID] = useState("")
  const [bankName, setBankName] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [reservedAssets, setReservedAssets] = useState(0)
  const [corpIDList, setCorpIDList] = useState<Array<string>>([])
  const [corpID, setCorpID] = useState("")
  const [managerList, setManagerList] = useState<Array<string>>([])
  const [manager, setManager] = useState("")
  const [employeeList, setEmployeeList] = useState<Array<string>>([])
  const [employee, setEmployee] = useState("")
  const [reload, setReload] = useState(0)

  useEffect(() => {
    let data = [];
    Axios.get("http://localhost:3001/get_corp_ids").then(r => {
      data = r.data;
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].corpID;
      }
      setCorpIDList(data);
      setCorpID(data[0]);
    });
    Axios.get("http://localhost:3001/get_available_manager_ids").then(r => {
      data = r.data;
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].perID;
      }
      setManagerList(data);
      setManager(data[0]);
    });
    Axios.get("http://localhost:3001/get_employee_id").then(r => {
      data = r.data;
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].perID;
      }
      setEmployeeList(data);
      setEmployee(data[0]);
    });
  }, [reload])

  function handleBankIDChange(event) {
    setBankID(event.target.value);
  }
  function hanldeBankNameChange(event) {
    setBankName(event.target.value);
  }
  function handleStreetChange(event) {
    setStreet(event.target.value);
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }
  function handleStateChange(event) {
    setState(event.target.value);
  }
  function handleZipChange(event) {
    setZip(event.target.value);
  }
  function handleReservedAssetsChange(event) {
    setReservedAssets(event.target.value);
  }
  function handleCorpIDChange(event) {
    setCorpID(event.target.value);
  }
  function handleManagerChange(event) {
    setManager(event.target.value);
  }
  function handleBankEmployeeChange(event) {
    setEmployee(event.target.value);
  }

  function clearState(event) {
    setBankID("")
    setBankName("")
    setStreet("")
    setCity("")
    setState("")
    setZip("")
    setReservedAssets(0)
    event.preventDefault();
  }

  function handleSubmit(event) {
    Axios.post("http://localhost:3001/create_bank", {
      bankID: bankID,
      bankName: bankName,
      street: street,
      city: city,
      state: state,
      zip: zip,
      reservedAssets: reservedAssets,
      corpID: corpID,
      manager: manager,
      bankEmployee: employee
    }).then(() => {
      console.log("Bank data sent!");
      clearState(event)
      setReload(reload + 1)
    })
    event.preventDefault();
  }
  return (
    <div className="container">
      <div className="mainHeader">
        <h6><Link to="../">Home</Link></h6>
        <h1>Q2: Create Bank</h1>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="formItem">
            <label>
              Bank ID:
            </label>
            <input type="text" value={bankID} onChange={handleBankIDChange} />
          </div>

          <div className="formItem">
            <label>
              Bank Name:
            </label>
            <input type="text" value={bankName} onChange={hanldeBankNameChange} />
          </div>

          <div className="formItem">
            <label>
              Street:
            </label>
            <input type="text" value={street} onChange={handleStreetChange} />
          </div>

          <div className="formItem">
            <label>
              City:
            </label>
            <input type="text" value={city} onChange={handleCityChange} />
          </div>

          <div className="formItem">
            <label>
              State:
            </label>
            <input type="text" value={state} onChange={handleStateChange} />
          </div>

          <div className="formItem">
            <label>
              Zip Code:
            </label>
            <input type="text" value={zip} onChange={handleZipChange} />
          </div>

          <div className="formItem">
            <label>
              Reserved Assets Value (USD):
            </label>
            <input type="text" value={reservedAssets} onChange={handleReservedAssetsChange} />
          </div>

          <div className="formItem">
            <label>
              Parent Corporation:
            </label>
            <select name="selectList" id="selectList" onChange={handleCorpIDChange}>
              {corpIDList.map(id => <option key={id} value={id}>{id}</option>)}
            </select>
          </div>

          <div className="formItem">
            <label>
              Manager:
            </label>
            <select name="selectList" id="selectList" onChange={handleManagerChange}>
              {managerList.map(id => <option key={id} value={id}>{id}</option>)}
            </select>
          </div>

          <div className="formItem">
            <label>
              Bank Employee:
            </label>
            <select name="selectList" id="selectList" onChange={handleBankEmployeeChange}>
              {employeeList.map(name => <option key={name} value={name}>{name}</option>)}
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