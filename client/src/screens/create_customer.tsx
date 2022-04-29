import React from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import "../styles/main.css";
import "../styles/forms.css";
import { CreateCustomerState } from '../types/State'

export class CreateCustomer extends React.Component<{}, CreateCustomerState> {
  constructor(props) {
    super(props);
    this.state = {
      personList: [],
      personID: "",
    };

    this.handlePersonIDChange = this.handlePersonIDChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  componentDidMount() {
    let data = [];
    Axios.get("http://localhost:3001/get_employee_id").then(r => {
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

  clearState(event) {
    console.log('cleared')
    this.setState({
      personID: "",
    })
    event.preventDefault();
  }

  handleSubmit(event) {
    Axios.post("http://localhost:3001/start_customer_role", {
      accountName: this.state.personID,
    }).then(() => {
      console.log("Customer data sent!");
    })
    this.clearState(event)
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="mainHeader">
          <h6><Link to="../">Home</Link></h6>
          <h1>Q4: Create Customer</h1>
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