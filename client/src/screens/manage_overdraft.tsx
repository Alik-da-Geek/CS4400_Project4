import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from 'axios';
import "../styles/main.css";
import "../styles/forms.css";

export function ManagerOverdraft() {
    const location = useLocation()
    const username = location.state['username']
    const role = location.state['role']
    const [checkingAccountList, setCheckingAccountList] = useState<Array<string>>([])
    const [savingsAccountList, setSavingsAccountList] = useState<Array<string>>([])
    const [checkingAccount, setCheckingAccount] = useState<string>("")
    const [savingsAccount, setSavingsAccount] = useState<string>("")
    const protectedString = " - (protected)";
    const [fetchAll, setFetchAll] = useState(0)
    const [hasProtection, setProtection] = useState(false)

    useEffect(() => {
        console.log(username + ", " + role)
        let data = []
        if (role === 'admin') {
            console.log('admin called')
            Axios.get("http://localhost:3001/get_all_chk_w_status").then(r => {
                data = r.data;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].protectionBank == null) {
                        data[i] = data[i].bankID + ": " + data[i].accountID;
                    } else {
                        data[i] = data[i].bankID + ": " + data[i].accountID + protectedString;
                    }
                }
                setCheckingAccountList(data)
                setCheckingAccount(data[0])
            })
            Axios.get("http://localhost:3001/get_all_sav").then(r => {
                data = r.data;
                for (let i = 0; i < data.length; i++) {
                    data[i] = data[i].bankID + ": " + data[i].accountID;
                }
                setSavingsAccountList(data)
                setSavingsAccount(data[0])
            })
        } else {
            console.log('customer called')
            Axios.post("http://localhost:3001/get_accessible_chk_w_status", {
                customerID: username
            }).then(r => {
                data = r.data;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].protectionBank == null) {
                        data[i] = data[i].bankID + ": " + data[i].accountID;
                    } else {
                        data[i] = data[i].bankID + ": " + data[i].accountID + protectedString;
                    }
                }
                setCheckingAccountList(data)
                setCheckingAccount(data[0])
            })
            Axios.post("http://localhost:3001/get_accessible_accounts", {
                customerID: username
            }).then(r => {
                data = r.data;
                for (let i = 0; i < data.length; i++) {
                    data[i] = data[i].bankID + ": " + data[i].accountID;
                }
                setSavingsAccountList(data)
                setSavingsAccount(data[0])
            })
        }
    }, [fetchAll, role, username])

    function handleCheckingAccountChange(event) {
        if (event.target.value.includes(protectedString)) {
            console.log("protected account, no savings")
            setProtection(true)
            setSavingsAccount("")
        } else {
            console.log("unprotected account, " + savingsAccountList[0])
            setProtection(false)
            setSavingsAccount(savingsAccountList[0])
        }
        setCheckingAccount(event.target.value);
    }
    function handleSavingsAccountChange(event) {
        setSavingsAccount(event.target.value);
    }

    function clearState(event) {
        setCheckingAccount("")
        setSavingsAccount("")
        setProtection(false)
        event.preventDefault();
    }

    function handleSubmit(event) {
        let accountArray = checkingAccount.split(": ")
        const checkingBankID = accountArray[0]
        const checkingAccountID = accountArray[1].replace(protectedString, "")
        if (!hasProtection) {
            accountArray = savingsAccount.split(": ")
            const savingsBankID = accountArray[0]
            const savingsAccountID = accountArray[1]
            Axios.post("http://localhost:3001/start_overdraft", {
                requester: username,
                checking_bankID: checkingBankID,
                checking_accountID: checkingAccountID,
                savings_bankID: savingsBankID,
                savings_accountID: savingsAccountID
            }).then(() => {
                console.log("Start overdraft data sent!");
                clearState(event)
                setFetchAll(fetchAll + 1)
            })
        } else {
            Axios.post("http://localhost:3001/stop_overdraft", {
                requester: username,
                checking_bankID: checkingBankID,
                checking_accountID: checkingAccountID
            }).then(() => {
                console.log("Stop overdraft data sent!");
                clearState(event)
                setFetchAll(fetchAll + 1)
            })
        }
        event.preventDefault();
    }

    return (
        <div className="container">
            <div className="mainHeader">
                <h6><Link to="../">Home</Link></h6>
                <h1>Manage Overdraft</h1>
                <p className="currentUser">{username}</p>
            </div>
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <div className="formItem">
                        <label>
                            Checking Account:
                        </label>
                        <select name="selectList" id="selectList" onChange={handleCheckingAccountChange}>
                            {checkingAccountList.map(name => <option key={name} value={name}>{name}</option>)}
                        </select>
                    </div>
                    {!hasProtection && <div className="formItem">
                        <label>
                            Savings Account:
                        </label>
                        <select name="selectList" id="selectList" onChange={handleSavingsAccountChange}>
                            {savingsAccountList.map(name => <option key={name} value={name}>{name}</option>)}
                        </select>
                    </div>}
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