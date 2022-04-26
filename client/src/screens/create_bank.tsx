import React from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import "../styles/main.css";
import "../styles/forms.css";
import { CreateBankState } from '../types/State'

class CreateBank extends React.Component<{}, CreateBankState> {
  constructor(props) {
    super(props);
    this.state = {
      bankID: '',
      bankName: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      reservedAssets: 0,
      corpID: '',
      manager: '',
      bank_employee: ''
    };

    this.handle_bankID_change = this.handle_bankID_change.bind(this);
    this.handle_bankName_change = this.handle_bankName_change.bind(this);
    this.handle_street_change = this.handle_street_change.bind(this);
    this.handle_city_change = this.handle_city_change.bind(this);
    this.handle_state_change = this.handle_state_change.bind(this);
    this.handle_zip_change = this.handle_zip_change.bind(this);
    this.handle_reservedAssets_change = this.handle_reservedAssets_change.bind(this);
    this.handle_corpID_change = this.handle_corpID_change.bind(this);
    this.handle_manager_change = this.handle_manager_change.bind(this);
    this.handle_bank_employee_change = this.handle_bank_employee_change.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  handle_bankID_change(event) {
    this.setState({ bankID: event.target.value });
  }
  handle_bankName_change(event) {
    this.setState({ bankName: event.target.value });
  }
  handle_street_change(event) {
    this.setState({ street: event.target.value });
  }
  handle_city_change(event) {
    this.setState({ city: event.target.value });
  }
  handle_state_change(event) {
    this.setState({ state: event.target.value });
  }
  handle_zip_change(event) {
    this.setState({ zip: event.target.value });
  }
  handle_reservedAssets_change(event) {
    this.setState({ reservedAssets: event.target.value });
  }
  handle_corpID_change(event) {
    this.setState({ corpID: event.target.value });
  }
  handle_manager_change(event) {
    this.setState({ manager: event.target.value });
  }
  handle_bank_employee_change(event) {
    this.setState({ bank_employee: event.target.value });
  }

  clearState(event) {
    console.log('cleared')
    this.setState({
      bankID: '',
      bankName: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      reservedAssets: 0,
      corpID: '',
      manager: '',
      bank_employee: ''
    })
    event.preventDefault();

  }

  handleSubmit(event) {
    // send data to back end route {create_corp}
    Axios.post("http://localhost:3001/create_bank", {
      bankID: this.state.bankID,
      bankName: this.state.bankName,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      reservedAssets: this.state.reservedAssets,
      corpID: this.state.corpID,
      manager: this.state.manager,
      bank_employee: this.state.bank_employee
    }).then(() => {
      console.log("Corporation data sent!");
    })

    console.log("\ncorporation created")
    console.log(this.state.bankID + ", "
      + this.state.bankName + ", "
      + this.state.street + ", "
      + this.state.city + ", "
      + this.state.state + ", "
      + this.state.zip + ", "
      + this.state.reservedAssets + ", "
      + this.state.corpID + ", "
      + this.state.manager + ", "
      + this.state.bank_employee)
    this.clearState(event)
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="mainHeader">
          <h6><Link to="../">Home</Link></h6>
          <h1>Q2: Create Bank</h1>
        </div>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="formItem">
              <label>
                Bank ID:
              </label>
              <input type="text" value={this.state.bankID} onChange={this.handle_bankID_change} />
            </div>

            <div className="formItem">
              <label>
                Bank Name:
              </label>
              <input type="text" value={this.state.bankName} onChange={this.handle_bankName_change} />
            </div>

            <div className="formItem">
              <label>
                Street:
              </label>
              <input type="text" value={this.state.street} onChange={this.handle_street_change} />
            </div>

            <div className="formItem">
              <label>
                City:
              </label>
              <input type="text" value={this.state.city} onChange={this.handle_city_change} />
            </div>

            <div className="formItem">
              <label>
                State:
              </label>
              <input type="text" value={this.state.state} onChange={this.handle_state_change} />
            </div>

            <div className="formItem">
              <label>
                Zip Code:
              </label>
              <input type="text" value={this.state.zip} onChange={this.handle_zip_change} />
            </div>

            <div className="formItem">
              <label>
                Reserved Assets Value (USD):
              </label>
              <input type="text" value={this.state.reservedAssets} onChange={this.handle_reservedAssets_change} />
            </div>

            <div className="formItem">
              <label>
                Parent Corporation ID:
              </label>
              <input type="text" value={this.state.corpID} onChange={this.handle_corpID_change} />
            </div>

            <div className="formItem">
              <label>
                Manager ID:
              </label>
              <input type="text" value={this.state.manager} onChange={this.handle_manager_change} />
            </div>

            <div className="formItem">
              <label>
                Bank Employee ID:
              </label>
              <input type="text" value={this.state.bank_employee} onChange={this.handle_bank_employee_change} />
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

export default CreateBank;