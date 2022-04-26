import React from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import "../styles/main.css";
import "../styles/forms.css";
import { StopCustomerState } from '../types/State'

export class StopCustomer extends React.Component<{}, StopCustomerState> {
    constructor(props) {
        super(props);
        this.state = {
            accountName: "",
        };

        this.handleAccountNameChange = this.handleAccountNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    handleAccountNameChange(event) {
        this.setState({ accountName: event.target.value });
    }

    clearState(event) {
        console.log('cleared')
        this.setState({
            accountName: "",
        })
        event.preventDefault();
    }

    handleSubmit(event) {
        // send data to back end route {create_corp}
        Axios.post("http://localhost:3001/create_employee", {
            accountName: this.state.accountName,
        }).then(() => {
            console.log("Customer data sent!");
            // TODO would it be possible to get a response about whether the request succeeded or not?
        })

        console.log("customer created")
        console.log(this.state)
        this.clearState(event)
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div className="mainHeader">
                    <h6><Link to="../">Home</Link></h6>
                    <h1>Q6: Stop Customer</h1>
                </div>
                <div className="formContainer">
                    <form onSubmit={this.handleSubmit}>
                        <div className="formItem">
                            <label>
                                Account Name:
                            </label>
                            <input type="text" value={this.state.accountName} onChange={this.handleAccountNameChange} />
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