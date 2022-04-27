import React from "react";
import { Link } from "react-router-dom";
import "../styles/main.css";
import { HomeState } from "../types/State";
//@ts-ignore
import Login from "./login.tsx";

class Home extends React.Component<{}, HomeState> {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: true,
      admin: true,
      manager: true,
      customer: true,
      username: "",
      password: "",
      accountID: "",
    }
    this.getScreen = this.getScreen.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  getScreen() {
    if (this.state.loggedIn) {
      return (
        <div className="list">
          <ol>
            {this.state.admin &&
              <li>
                <Link to="create_corp">Create Corp</Link>
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="create_bank">Create Bank</Link>
              </li>
            }
            <li>
              <Link to="create_employee">Create Employee</Link>
            </li>
            <li>
              <Link to="create_customer">Create Customer</Link>
            </li>
            {this.state.admin &&
              <li>
                <Link to="stop_employee">Stop Employee</Link>
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="stop_customer">Stop Customer</Link>
              </li>
            }
            {(this.state.admin || this.state.manager) &&
              <li>
                <Link to="hire_worker">Hire Worker</Link>
              </li>}
            {(this.state.admin || this.state.manager) &&
              <li>
                <Link to="pay_employees">Pay Employees</Link>
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="replace_manager">Replace Manager</Link>
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="create_fee">Create Fee</Link>
              </li>
            }
            {(this.state.admin || this.state.customer) &&
              <li>
                <Link to="manage_account_access">Manage Account Access</Link>
              </li>
            }
            {(this.state.admin || this.state.customer) &&
              <li>
                <Link to="manager_overdraft">Manager Overdraft Policies</Link>
              </li>
            }
            {this.state.customer &&
              <li>
                <Link to="make_deposit">Make Deposit</Link>
              </li>
            }
            {this.state.customer &&
              <li>
                <Link to="make_withdrawal">Make Withdrawal</Link>
              </li>
            }
            {this.state.customer &&
              <li>
                <Link to="make_transfer">Make Transfer</Link>
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="display_account_stats">Account Stats</Link>
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="display_bank_stats">Bank Stats</Link>
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="display_corporation_stats">Corporation Stats</Link>
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="display_customer_stats">Customer Stats</Link>
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="display_employee_stats">Employee Stats</Link>
              </li>
            }
          </ol>
        </div>
      )
    } else {
      return <Login />
    }
  }

  handleLogout() {
    this.setState({
      loggedIn: false,
      username: "",
      password: "",
      accountID: "",
    })
  }

  render() {
    let homePage = this.getScreen()
    return (
      <div className="container">
        <div className="mainHeader">
          <h1>CS 4400 Phase 4</h1>
          <h6 onClick={this.handleLogout}>Logout</h6>
        </div>
        {homePage}
      </div>
    );
  }
}

export default Home;
