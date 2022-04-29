import React from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import "../styles/main.css";
import "../styles/forms.css";
import { CreateFeeState } from '../types/State'
import { CreateFeeProps } from "../types/props";

export class CreateFee extends React.Component<CreateFeeProps, CreateFeeState> {
  constructor(props) {
    super(props);
    this.state = {
      bankList: [],
      bank: "",
      accountList: [],
      account: "",
      feeType: "",
    };
    this.handleBankChange = this.handleBankChange.bind(this);
    this.handleAccountChange = this.handleAccountChange.bind(this);
    this.handleFeeTypeChange = this.handleFeeTypeChange.bind(this);
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

    //TODO change this up
    // Axios.get("http://localhost:3001/get_accessible_accounts", {
    //   customerID: this.props.customerID
    // }).then(r => {
    //   data = r.data;
    //   console.log(data)
    //   for (let i = 0; i < data.length; i++) {
    //     data[i] = data[i].perID;
    //   }
    //   this.setState({ accountList: data });
    //   this.setState({ account: data[0] });
    // });
  }

  handleBankChange(event) {
    this.setState({ bank: event.target.value });
  }
  handleAccountChange(event) {
    this.setState({ account: event.target.value });
  }
  handleFeeTypeChange(event) {
    this.setState({ feeType: event.target.value })
  }

  clearState(event) {
    console.log('cleared')
    this.setState({
      bankList: [],
      bank: "",
      accountList: [],
      account: "",
      feeType: "",
    })
    event.preventDefault();
  }

  handleSubmit(event) {
    // send data to back end route {create_corp}
    Axios.post("http://localhost:3001/create_fee", {
      bankID: this.state.bank,
      accountID: this.state.account,
      fee_type: this.state.feeType,
    }).then(() => {
      console.log("Hire worker data sent!");
      this.clearState(event)
    })
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="mainHeader">
          <h6><Link to="../">Home</Link></h6>
          <h1>Q9: Create Fee</h1>
        </div>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
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
                Employee:
              </label>
              <select name="selectList" id="selectList" onChange={this.handleAccountChange}>
                {this.state.accountList.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
            </div>
            <div className="formItem">
              <label>
                Fee Type:
              </label>
              <input type="text" value={this.state.feeType} onChange={this.handleFeeTypeChange} />
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