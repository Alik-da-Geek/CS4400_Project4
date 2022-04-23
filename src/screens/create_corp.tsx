import React from "react";
import "../styles/main.css";
import { CreateCorpState } from '../types/Props'

class CreateCorp extends React.Component<{}, CreateCorpState> {
  constructor(props) {
    super(props);
    this.state = {
      corpID: '',
      longName: '',
      shortName: '',
      reservedAssets: 0
    };

    this.handleCorpIDChange = this.handleCorpIDChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCorpIDChange(event) {
    this.setState({ corpID: event.target.value });
  }

  handleSubmit(event) {
    alert('A corporation was created\n');
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="mainHeader">
          <h1 className="mainTitle">Q1: Create Corporation</h1>
        </div>
        <div className="createCorpForm">
          <form onSubmit={this.handleSubmit}>
            <label>
              Corporation ID:
              <input type="text" value={this.state.corpID} onChange={this.handleCorpIDChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default CreateCorp;
