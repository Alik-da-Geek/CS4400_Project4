import React from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import "../styles/main.css";
import "../styles/forms.css";
import { CreateEmployeeState } from '../types/State'

class CreateEmployee extends React.Component<{}, CreateEmployeeState> {
  constructor(props) {
    super(props);
    this.state = {
      accountName: "",
      salary: 0,
      numPayments: 0,
      accumulatedEarnings: 0
    };

    this.handleAccountNameChange = this.handleAccountNameChange.bind(this);
    this.handleSalaryChange = this.handleSalaryChange.bind(this);
    this.handleNumPaymentsChange = this.handleNumPaymentsChange.bind(this);
    this.handleAccumulatedEarningsChange = this.handleAccumulatedEarningsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  handleAccountNameChange(event) {
    this.setState({ accountName: event.target.value });
  }
  handleSalaryChange(event) {
    if (event.target.validity.valid) {
      this.setState({ salary: event.target.value });
    }
  }
  handleNumPaymentsChange(event) {
    if (event.target.validity.valid) {
      this.setState({ numPayments: event.target.value });
    }
  }
  handleAccumulatedEarningsChange(event) {
    if (event.target.validity.valid) {
      this.setState({ accumulatedEarnings: event.target.value });
    }
  }

  clearState(event) {
    console.log('cleared')
    this.setState({
      accountName: "",
      salary: 0,
      numPayments: 0,
      accumulatedEarnings: 0
    })
    event.preventDefault();
  }

  handleSubmit(event) {
    // send data to back end route {create_corp}
    Axios.post("http://localhost:3001/create_employee", {
      accountName: this.state.accountName,
      salary: this.state.salary,
      numPayments: this.state.numPayments,
      accumulatedEarnings: this.state.accumulatedEarnings
    }).then(() => {
      console.log("Employee data sent!");
      // TODO would it be possible to get a response about whether the request succeeded or not?
    })

    console.log("employee created")
    console.log(this.state)
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
                Account Name:
              </label>
              <input type="text" value={this.state.accountName} onChange={this.handleAccountNameChange} />
            </div>
            <div className="formItem">
              <label>
                Salary:
              </label>
              <input type="text" value={this.state.salary} onChange={this.handleSalaryChange} />
              {/* <input type="text" pattern="[0-9]*" value={this.state.salary} onChange={this.handleSalaryChange} /> */}
            </div>
            <div className="formItem">
              <label>
                Number of Payments:
              </label>
              <input type="text" pattern="[0-9]*" value={this.state.numPayments} onChange={this.handleNumPaymentsChange} />
            </div>
            <div className="formItem">
              <label>
                Accumulated Earnings:
              </label>
              <input type="text" pattern="[0-9]*" value={this.state.accumulatedEarnings} onChange={this.handleAccumulatedEarningsChange} />
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

export default CreateEmployee;
