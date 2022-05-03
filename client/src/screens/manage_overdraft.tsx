import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from 'axios';
import "../styles/main.css";
import "../styles/forms.css";

export function ManagerOverdraft() {
    const location = useLocation()
    const username = location.state['username']
    const [checkingAccountList, setCheckingAccountList] = useState<Array<string>>([])
    const [savingsAccountList, setSavingsAccountList] = useState<Array<string>>([])
    const [checkingAccount, setCheckingAccount] = useState<string>("")
    const [savingsAccount, setSavingsAccount] = useState<string>("")
    const protectedString = " - (protected)";
    const [fetchAll, setFetchAll] = useState(0)

    useEffect(() => {
        console.log(username)
        let data = []
        console.log("penis")
        Axios.get("http://localhost:3001/get_all_chk_w_status").then(r => {
            data = r.data;
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                if (data[i].protectionBank == null) {
                    data[i] = data[i].bankID + ": " + data[i].accountID + protectedString;
                } else {
                    data[i] = data[i].bankID + ": " + data[i].accountID;
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
    }, [fetchAll])

    function handleCheckingAccountChange(event) {
        setCheckingAccount(event.target.value);
    }
    function handleSavingsAccountChange(event) {
        setSavingsAccount(event.target.value);
    }

    function clearState(event) {
        setCheckingAccount("")
        setSavingsAccount("")
        event.preventDefault();
    }

    function handleSubmit(event) {
        let accountArray = checkingAccount.split(": ")
        const checkingBankID = accountArray[0]
        const checkingAccountID = accountArray[1].replace(protectedString, "")
        const removeOverdraft = checkingAccountID.includes(protectedString)
        if (!removeOverdraft) {
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
                    <div className="formItem">
                        <label>
                            Savings Account:
                        </label>
                        <select name="selectList" id="selectList" onChange={handleSavingsAccountChange}>
                            {savingsAccountList.map(name => <option key={name} value={name}>{name}</option>)}
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