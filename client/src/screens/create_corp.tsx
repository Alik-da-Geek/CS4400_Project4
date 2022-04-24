import React from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import "../styles/main.css";
import "../styles/forms.css";
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
    this.handleLongNameChange = this.handleLongNameChange.bind(this);
    this.handleShortNameChange = this.handleShortNameChange.bind(this);
    this.handleReservedAssetsChange = this.handleReservedAssetsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  handleCorpIDChange(event) {
    this.setState({ corpID: event.target.value });
  }
  handleLongNameChange(event) {
    this.setState({ longName: event.target.value });
  }
  handleShortNameChange(event) {
    this.setState({ shortName: event.target.value });
  }
  handleReservedAssetsChange(event) {
    this.setState({ reservedAssets: event.target.value });
  }

  clearState(event) {
    console.log('cleared')
    this.setState({
      corpID: '',
      longName: '',
      shortName: '',
      reservedAssets: 0
    })
    event.preventDefault();

  }

  handleSubmit(event) {
    // send data to back end route {create_corp}
    Axios.post("http://localhost:3001/create_corp", {
      corpID: this.state.corpID,
      longName: this.state.longName,
      shortName: this.state.shortName,
      reservedAssets: this.state.reservedAssets
    }).then(() => {
      console.log("Corporation data sent!");
    })

    console.log("\ncorporation created")
    console.log(this.state.corpID + ", " + this.state.longName + ", " + this.state.shortName + ", " + this.state.reservedAssets)
    this.clearState(event)
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="mainHeader">
          <h6><Link to="../">Home</Link></h6>
          <h1>Q1: Create Corporation</h1>
        </div>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="formItem">
              <label>
                Corporation ID:
              </label>
              <input type="text" value={this.state.corpID} onChange={this.handleCorpIDChange} />
            </div>
            <div className="formItem">
              <label>
                Long Name:
              </label>
              <input type="text" value={this.state.longName} onChange={this.handleLongNameChange} />
            </div>
            <div className="formItem">
              <label>
                Short Name:
              </label>
              <input type="text" value={this.state.shortName} onChange={this.handleShortNameChange} />
            </div>
            <div className="formItem">
              <label>
                Reserved Assets:
              </label>
              <input type="text" value={this.state.reservedAssets} onChange={this.handleReservedAssetsChange} />
            </div>
            <button onClick={this.clearState} className="formCancel">
              Cancel
            </button>
            <button onClick={this.handleSubmit} className="formSubmit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateCorp;
