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
    const [startOverdraft, setStartOverdraft] = useState(true)

    useEffect(() => {
        console.log(username)
        let data = []
        Axios.post("http://localhost:3001/get_accessible_chk_accounts", {
            customerID: username
        }).then(r => {
            data = r.data;
            for (let i = 0; i < data.length; i++) {
                data[i] = data[i].bankID + ": " + data[i].accountID;
            }
            setCheckingAccountList(data)
            setCheckingAccount(data[0])
        })
        Axios.post("http://localhost:3001/get_accessible_sav_accounts", {
            customerID: username
        }).then(r => {
            data = r.data;
            for (let i = 0; i < data.length; i++) {
                data[i] = data[i].bankID + ": " + data[i].accountID;
            }
            setSavingsAccountList(data)
            setSavingsAccount(data[0])
        })
    }, [username, location])

    function handleCheckingAccountChange(event) {
        setCheckingAccount(event.target.value);
    }
    function handleSavingsAccountChange(event) {
        setSavingsAccount(event.target.value);
    }
    function handleOverdraftChange(event) {
        setStartOverdraft(!startOverdraft)
    }

    function clearState(event) {
        console.log('cleared')
        setStartOverdraft(true)
        setCheckingAccount("")
        setSavingsAccount("")
        event.preventDefault();
    }

    function handleSubmit(event) {
        let accountArray = checkingAccount.split(": ")
        const checkingBankID = accountArray[0]
        const checkingAccountID = accountArray[1]
        if (startOverdraft) {
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
            })
        } else {
            Axios.post("http://localhost:3001/stop_overdraft", {
                requester: username,
                checking_bankID: checkingBankID,
                checking_accountID: checkingAccountID
            }).then(() => {
                console.log("Stop overdraft data sent!");
                clearState(event)
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
                            Start Overdraft:
                        </label>
                        <input type="checkbox" checked={startOverdraft} onChange={handleOverdraftChange} />
                    </div>
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