import React from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import "../styles/main.css";
import "../styles/forms.css";
import { ReplaceManagerState } from '../types/State'

export class ReplaceManager extends React.Component<{}, ReplaceManagerState> {
  constructor(props) {
    super(props);
    this.state = {
      bankList: [],
      bank: "",
      employeeList: [],
      employee: "",
      salary: 0,
    };
    this.handleBankChange = this.handleBankChange.bind(this);
    this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
    this.handleSalaryChange = this.handleSalaryChange.bind(this);
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

    Axios.get("http://localhost:3001/get_employee_id").then(r => {
      data = r.data;
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].perID;
      }
      this.setState({ employeeList: data });
      this.setState({ employee: data[0] });
    });
  }

  handleBankChange(event) {
    this.setState({ bank: event.target.value });
  }
  handleEmployeeChange(event) {
    this.setState({ employee: event.target.value });
  }
  handleSalaryChange(event) {
    this.setState({ salary: event.target.value });
  }

  clearState(event) {
    console.log('cleared')
    this.setState({
      salary: 0
    })
    event.preventDefault();
  }

  handleSubmit(event) {
    // send data to back end route {create_corp}
    Axios.post("http://localhost:3001/replace_manager", {
      bankID: this.state.bank,
      perID: this.state.employee,
      salary: this.state.salary
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
          <h1>Q8: Replace Manager</h1>
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
              <select name="selectList" id="selectList" onChange={this.handleEmployeeChange}>
                {this.state.employeeList.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
            </div>
            <div className="formItem">
              <label>
                Salary:
              </label>
              <input type="text" value={this.state.salary} onChange={this.handleSalaryChange} />
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