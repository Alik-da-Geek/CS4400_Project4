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
            <li>
              <Link to="create_corp">Create Corp</Link>
            </li>
            <li>
              <Link to="create_bank">Create Bank</Link>
            </li>
            <li>
              <Link to="create_employee">Create Employee</Link>
            </li>
            <li>
              <Link to="create_customer">Create Customer</Link>
            </li>
            <li>
              <Link to="stop_employee">Stop Employee</Link>
            </li>
            <li>
              <Link to="stop_customer">Stop Customer</Link>
            </li>
            <li>
              <Link to="display_account_stats">Account Stats</Link>
            </li>
            <li>
              <Link to="display_bank_stats">Bank Stats</Link>
            </li>
            <li>
              <Link to="display_corporation_stats">Corporation Stats</Link>
            </li>
            <li>
              <Link to="display_customer_stats">Customer Stats</Link>
            </li>
            <li>
              <Link to="display_employee_stats">Employee Stats</Link>
            </li>
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
