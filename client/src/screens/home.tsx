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
    this.state = JSON.parse(window.localStorage.getItem('state')) || {
      username: "",
      loggedIn: false,
      admin: false,
      manager: false,
      customer: false,
      employee: false,
    }
    this.changeRole = this.changeRole.bind(this)
    this.getScreen = this.getScreen.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.setState = this.setState.bind(this)
  }

  setState(state) {
    window.localStorage.setItem('state', JSON.stringify(state));
    super.setState(state);
  }

  changeRole(role: string, username: string) {
    console.log(role, username)
    if (role === 'NA') {
      return
    }
    if (role === 'admin') {
      this.setState({
        ...this.state,
        loggedIn: true,
        username: username,
        admin: true,
      })
    } else if (role === 'manager') {
      this.setState({
        ...this.state,
        loggedIn: true,
        username: username,
        manager: true,
      })
    } else if (role === 'double') {
      this.setState({
        ...this.state,
        loggedIn: true,
        username: username,
        employee: true,
        customer: true,
      })
    } else if (role === 'customer') {
      this.setState({
        ...this.state,
        loggedIn: true,
        username: username,
        customer: true,
      })
    } else if (role === 'employee') {
      this.setState({
        ...this.state,
        loggedIn: true,
        username: username,
        employee: true,
      })
    }
  }

  getScreen() {
    if (this.state.loggedIn) {
      return (
        <div className="list" >
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
            {this.state.admin &&
              <li>
                <Link to="create_employee">Create Employee</Link>
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="create_customer">Create Customer</Link>
              </li>
            }
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
            {this.state.customer &&
              <li>
                <Link to="manage_account_access" state={{ username: this.state.username }}>Manage Account Access</Link>
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="manage_account" state={{ username: this.state.username }}>Manage Account</Link>
              </li>
            }
            {this.state.admin &&
              <li>
                <Link to="create_fee" state={{ username: this.state.username }}>Create Fee</Link>
              </li>
            }
            {(this.state.admin || this.state.customer) &&
              <li>
                <Link to={"manage_overdraft"} state={{ username: this.state.username }}>Manager Overdraft Policies</Link>
              </li>
            }
            {this.state.customer &&
              <li>
                <Link to={"make_deposit"} state={{ username: this.state.username }}>Make Deposit</Link>
              </li>
            }
            {this.state.customer &&
              <li>
                <Link to={"make_withdrawal"} state={{ username: this.state.username }}>Make Withdrawal</Link>
              </li>
            }
            {this.state.customer &&
              <li>
                <Link to={"make_transfer"} state={{ username: this.state.username }}>Make Transfer</Link>
              </li>
            }
            {(this.state.admin || this.state.manager) &&
              <li>
                <Link to="pay_employees">Pay Employees</Link>
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
      const LoginProp: LoginProps = {
        setRole: this.changeRole,
      }
      return <Login {...LoginProp} />
    }
  }

  handleLogout() {
    this.setState({
      username: "",
      loggedIn: false,
      admin: false,
      manager: false,
      customer: false,
      employee: false,
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
