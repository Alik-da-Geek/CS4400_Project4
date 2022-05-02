import React from "react";
import { Link } from "react-router-dom";
import "../styles/main.css";
import { HomeState } from "../types/State";
import { LoginProps } from "../types/props";
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
    this.changeRole = this.changeRole.bind(this)
    this.getScreen = this.getScreen.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  changeRole(role: string, username: string, password: string) {
    if (role === 'NA') {
      return
    }
    // TODO discrepancy between admin, customer, employee and admin, manager, customer
    this.setState({
      loggedIn: true,
      username: username,
      password: password,
    })
    if (role === 'admin') {
      this.setState({
        admin: true,
      })
    } else if (role === 'double') {
      this.setState({
        customer: true,
      })
    } else if (role === 'customer') {
      this.setState({
        customer: true,
      })
    }
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
              <Link to="create_employee">Create Employee (CHECK)</Link>
            </li>
            <li>
              <Link to="create_customer">Create Customer (CHECK)</Link>
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
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="replace_manager">Replace Manager</Link>
              </li>
            }
            {(this.state.admin || this.state.customer) &&
              <li>
                <Link to="manage_account_access">Manage Account Access (TODO)</Link>
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="create_fee">Create Fee (CHECK: second drop down should be accounts, use H12 endpoints)</Link>
              </li>
            }
            {(this.state.admin || this.state.customer) &&
              <li>
                <Link to="manager_overdraft">Manager Overdraft Policies (TODO)</Link>
              </li>
            }
            {this.state.customer &&
              <li>
                <Link to="make_deposit">Make Deposit (CHECK)</Link>
              </li>
            }
            {this.state.customer &&
              <li>
                <Link to="make_withdrawal">Make Withdrawal (CHECK)</Link>
              </li>
            }
            {this.state.customer &&
              <li>
                <Link to="make_transfer">Make Transfer (CHECK)</Link>
              </li>
            }
            {(this.state.admin || this.state.manager) &&
              <li>
                <Link to="pay_employees">Pay Employees (CHECK)</Link>
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="display_account_stats">Account Stats (CHECK)</Link>
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="display_bank_stats">Bank Stats (CHECK)</Link>
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="display_corporation_stats">Corporation Stats (CHECK)</Link>
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="display_customer_stats">Customer Stats (CHECK)</Link>
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="display_employee_stats">Employee Stats (CHECK)</Link>
              </li>
            }
          </ol>
        </div>
      )
    } else {
      const LoginProp: LoginProps = {
        setRole: this.changeRole,
      }
      return <Login {...LoginProp} />
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
