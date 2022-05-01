import React from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import moment from "moment";
import "../styles/main.css";
import "../styles/forms.css";
import { ManageAccountAccessState } from '../types/State'
import { ManageAccountAccessProps } from '../types/Props'

export class ManageAccountAccess extends React.Component<ManageAccountAccessProps, ManageAccountAccessState> {
  constructor(props) {
    super(props);
    this.state = {
      accountList: [],
      account: "",
      customerList: [],
      customer: "",
      bankList: [],
      bank: "",
      // TODO I have no idea what to get for this
      accountIDList: [],
      accountID: "",
      accountTypeList: ["checking", "savings", "market"],
      accountType: "checking",
      addOwner: false,
      initialBalance: 0,
      minBalance: 0,
      interestRate: 0,
      maxWithdrawals: 0
    };

    this.handleAccountIDChange = this.handleAccountIDChange.bind(this);
    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.handleBankChange = this.handleBankChange.bind(this);
    this.handleAccountTypeChange = this.handleAccountTypeChange.bind(this);
    this.handleAddOwnerChange = this.handleAddOwnerChange.bind(this);
    this.handleInitialBalanceChange = this.handleInitialBalanceChange.bind(this);
    this.handleMinBalanceChange = this.handleMinBalanceChange.bind(this);
    this.handleInterestRateChange = this.handleInterestRateChange.bind(this);
    this.handleMaxWithdrawalsChange = this.handleMaxWithdrawalsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  componentDidMount() {
    let data = [];
    //TODO check this endpoint
    Axios.get("http://localhost:3001/get_accessible_accounts").then(r => {
      data = r.data;
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].perID;
      }
      this.setState({ accountList: data });
      this.setState({ account: data[0] });
    });
    Axios.get("http://localhost:3001/get_customer_IDs").then(r => {
      data = r.data;
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].perID;
      }
      this.setState({ customerList: data });
      this.setState({ customer: data[0] });
    });
    Axios.get("http://localhost:3001/get_bank_IDs").then(r => {
      data = r.data;
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].perID;
      }
      this.setState({ bankList: data });
      this.setState({ bank: data[0] });
    });
  }

  handleAccountIDChange(event) {
    this.setState({ accountID: event.target.value });
  }
  handleCustomerChange(event) {
    this.setState({ customer: event.target.value });
  }
  handleBankChange(event) {
    this.setState({ bank: event.target.value });
  }
  handleAccountTypeChange(event) {
    this.setState({ accountType: event.target.value });
  }
  handleAddOwnerChange(event) {
    this.setState({ addOwner: event.target.value })
  }
  handleInitialBalanceChange(event) {
    this.setState({ initialBalance: event.target.value })
  }
  handleMinBalanceChange(event) {
    this.setState({ minBalance: event.target.value })
  }
  handleInterestRateChange(event) {
    this.setState({ interestRate: event.target.value })
  }
  handleMaxWithdrawalsChange(event) {
    this.setState({ maxWithdrawals: event.target.value })
  }

  clearState(event) {
    console.log('cleared')
    this.setState({
      account: "",
      customer: "",
      addOwner: false,
      initialBalance: 0,
      minBalance: 0,
      interestRate: 0,
      maxWithdrawals: 0
    })
    event.preventDefault();
  }

  getPeople() {

  }

  handleSubmit(event) {
    const date = moment().format("YYYY-MM-DD")
    Axios.post("http://localhost:3001/add_account_access", {
      requester: this.props.requesterID,
      customer: this.state.customer,
      account_type: this.state.accountType,
      bankID: this.state.bank,
      accountID: this.state.account,
      balance: this.state.initialBalance,
      interest_rate: this.state.interestRate,
      dtDeposit: date,
      minBalance: this.state.minBalance,
      // TODO wtf do i put here
      numWithdrawals: 0,
      maxWithdrawals: this.state.maxWithdrawals,
      dtShareStart: date
    }).then(() => {
      console.log("Employee data sent!");
    })
    this.clearState(event)
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="mainHeader">
          <h6><Link to="../">Home</Link></h6>
          <h1>Q3: Create Employee</h1>
        </div>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="formItem">
              <label>
                Person ID:
              </label>
              <select name="selectList" id="selectList" onChange={this.handlePersonIDChange}>
                {this.state.personList.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
            </div>
            <div className="formItem">
              <label>
                Salary:
              </label>
              <input type="text" value={this.state.salary} onChange={this.handleSalaryChange} />
            </div>
            <div className="formItem">
              <label>
                Number of Payments:
              </label>
              <input type="text" value={this.state.numPayments} onChange={this.handleNumPaymentsChange} />
            </div>
            <div className="formItem">
              <label>
                Accumulated Earnings:
              </label>
              <input type="text" value={this.state.accumulatedEarnings} onChange={this.handleAccumulatedEarningsChange} />
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