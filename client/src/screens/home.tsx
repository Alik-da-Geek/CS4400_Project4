import React from "react";
import { Link } from "react-router-dom";
import "../styles/main.css";

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="mainHeader">
          <h1>CS 4400 Phase 4</h1>
        </div>
        <div className="list">
          <ol>
            <li>
              <Link to="create_corp">Create Corp</Link>
            </li>
            <li>
              <Link to="create_bank">Create Bank</Link>
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

export default Home;
