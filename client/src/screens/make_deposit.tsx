import React from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import moment from "moment";
import "../styles/main.css";
import "../styles/forms.css";
import { MakeDepositState } from '../types/State'
import { MakeDepositProps } from "../types/props";

export class MakeDeposit extends React.Component<MakeDepositProps, MakeDepositState> {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      bankList: [],
      bank: "",
      accountList: [],
      account: "",
    };
    this.handleBankChange = this.handleBankChange.bind(this);
    this.handleAccountChange = this.handleAccountChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  componentDidMount() {
    let data = [];
    Axios.get("http://localhost:3001/get_bank_IDs").then(r => {
      data = r.data;
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].bankID;
      }
      this.setState({ bankList: data });
      this.setState({ bank: data[0] });
    });

    Axios.post("http://localhost:3001/get_accessible_accounts", {
      customerID: this.props.customerID
    }).then(r => {
      data = r.data;
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].perID;
      }
      this.setState({ accountList: data });
      this.setState({ account: data[0] });
    });
  }

  handleBankChange(event) {
    this.setState({ bank: event.target.value });
  }
  handleAccountChange(event) {
    this.setState({ account: event.target.value });
  }
  handleAmountChange(event) {
    this.setState({ amount: event.target.value });
  }

  clearState(event) {
    console.log('cleared')
    this.setState({
      amount: 0,
      bank: "",
      account: "",
    })
    event.preventDefault();
  }

  handleSubmit(event) {
    const date = moment().format("DD-MM-YYYY")
    Axios.post("http://localhost:3001/account_deposit", {
      requester: this.props.customerID,
      depositAmount: this.state.amount,
      bankID: this.state.bank,
      accountID: this.state.account,
      dtAction: date
    }).then(() => {
      console.log("Replace manager data sent!");
      this.clearState(event)
    })
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="mainHeader">
          <h6><Link to="../">Home</Link></h6>
          <h1>Q14: Make Deposit</h1>
        </div>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="formItem">
              <label>
                Amount:
              </label>
              <input type="text" value={this.state.amount} onChange={this.handleAccountChange} />
            </div>
            <div className="formItem">
              <label>
                Bank:
              </label>
              <select name="selectList" id="selectList" onChange={this.handleBankChange}>
                {this.state.bankList.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
            </div>
            <div className="formItem">
              <label>
                Account:
              </label>
              <select name="selectList" id="selectList" onChange={this.handleAccountChange}>
                {this.state.accountList.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
            </div>

            <div className="formButtons">
              <button onClick={this.clearState} className="formCancel">
                Cancel
              </button>
              <button onClick={this.handleSubmit} className="formSubmit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}