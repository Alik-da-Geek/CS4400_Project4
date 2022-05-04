import React from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import "../styles/main.css";
import "../styles/forms.css";

export class PayEmployees extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    Axios.post("http://localhost:3001/pay_employees", {
    }).then(() => {
      console.log("Employees paid!");
    })
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="mainHeader">
          <h6><Link to="../">Home</Link></h6>
          <h1>Q17: Pay Employee</h1>
        </div>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="formButtons">
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