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
      passwords: {},
    };
    this.handlePersonIDChange = this.handlePersonIDChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  componentDidMount() {
    this.updatePeopleList()
  }

  updatePeopleList() {
    Axios.get("http://localhost:3001/get_non_customers").then(r => {
      let data = r.data
      let passwordTemp: { [key: string]: string } = {}
      let peopleTemp = []
      let perID = ""
      let pwd = ""
      console.table(data)
      for (let i = 0; i < data.length; i++) {
        perID = data[i]['perID']
        pwd = data[i]['pwd']
        passwordTemp[perID] = pwd
        peopleTemp[i] = perID
      }
      console.log(peopleTemp)
      console.log(passwordTemp)
      this.setState({
        peopleList: peopleTemp,
        personID: peopleTemp[0],
        passwords: passwordTemp
      });
    });
  }

  handlePersonIDChange(event) {
    this.setState({
      personID: event.target.value,
    });
  }

  clearState(event) {
    this.setState({
      personID: this.state.peopleList[0]
    })
    event.preventDefault();
  }

  handleSubmit(event) {
    console.log(this.state)
    Axios.post("http://localhost:3001/start_customer_role", {
      perID: this.state.personID,
      cust_password: this.state.passwords[this.state.personID],
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
                {this.state.peopleList.map(name => <option key={name} value={name}>{name}</option>)}
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