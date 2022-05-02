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
      personList: [],
      personID: "",
      salary: 0,
      numPayments: 0,
      accumulatedEarnings: 0
    };

    this.handlePersonIDChange = this.handlePersonIDChange.bind(this);
    this.handleSalaryChange = this.handleSalaryChange.bind(this);
    this.handleNumPaymentsChange = this.handleNumPaymentsChange.bind(this);
    this.handleAccumulatedEarningsChange = this.handleAccumulatedEarningsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  componentDidMount() {
    let data = [];
    //TODO check this endpoint
    Axios.get("http://localhost:3001/get_perID").then(r => {
      data = r.data;
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].perID;
      }
      this.setState({ personList: data });
      this.setState({ personID: data[0] });
    });
  }

  handlePersonIDChange(event) {
    this.setState({ personID: event.target.value });
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
      personID: "",
      salary: 0,
      numPayments: 0,
      accumulatedEarnings: 0
    })
    event.preventDefault();
  }

  getPeople() {

  }

  handleSubmit(event) {
    Axios.post("http://localhost:3001/start_employee_role", {
      personID: this.state.personID,
      salary: this.state.salary,
      numPayments: this.state.numPayments,
      accumulatedEarnings: this.state.accumulatedEarnings
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

export default CreateEmployee;
