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
            personList: [],
            personID: "",
        };

        this.handlePersonIDChange = this.handlePersonIDChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    componentDidMount() {
        this.updatePersonList()
    }

    updatePersonList() {
        Axios.get("http://localhost:3001/get_stop_customer_IDs").then(r => {
            let data = r.data;
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                data[i] = data[i].perID;
            }
            this.setState({ personList: data });
            this.setState({ personID: data[0] });
        });
    }

    handlePersonIDChange(event) {
        this.setState({ personID: event.target.value });
    }

    clearState(event) {
        this.setState({
            personID: this.state.personList[0]
        })
        event.preventDefault();
    }

    handleSubmit(event) {
        console.log("Removing customer: " + this.state.personID)
        Axios.post("http://localhost:3001/stop_customer_role", {
            perID: this.state.personID,
        }).then(() => {
            this.updatePersonList()
        })
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
                                Person ID:
                            </label>
                            <select name="selectList" id="selectList" value={this.state.personID} onChange={this.handlePersonIDChange}>
                                {this.state.personList.map(name => <option key={name} value={name}>{name}</option>)}
                            </select>
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