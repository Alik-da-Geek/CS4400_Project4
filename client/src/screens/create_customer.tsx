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
      peopleList: [],
      personID: "",
      password: "",
    };
    this.handlePersonIDChange = this.handlePersonIDChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  componentDidMount() {
    Axios.get("http://localhost:3001/get_perID").then(r => {
      this.setState({
        peopleList: r.data,
        personID: r.data[0]['perID'],
        password: r.data[0]['pwd']
      })
    });
  }

  handlePersonIDChange(event) {
    const tempArray = event.target.value.split(",")
    const username = tempArray[0]
    const password = tempArray[1]
    this.setState({
      personID: username,
      password: password
    });
  }

  clearState(event) {
    console.log('cleared')
    this.setState({
    })
    event.preventDefault();
  }

  handleSubmit(event) {
    console.log(this.state)
    Axios.post("http://localhost:3001/start_customer_role", {
      perID: this.state.personID,
      cust_password: this.state.password,
    }).then(() => {
      console.log("Customer data sent!");
      this.clearState(event)
    })
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
                {this.state.peopleList.map(name => <option key={name['perID']} value={[name['perID'], name['pwd']]}>{name['perID']}</option>)}
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