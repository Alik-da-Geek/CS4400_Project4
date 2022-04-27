import React from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import "../styles/main.css";
import "../styles/forms.css";
import { LoginState } from '../types/State'

class Login extends React.Component<{}, LoginState> {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
        };
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    handleIDChange(event) {
        this.setState({ id: event.target.value });
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    clearState(event) {
        console.log('cleared')
        this.setState({
            id: '',
            password: '',
        })
        event.preventDefault();

    }

    handleSubmit(event) {
        // send data to back end route {create_corp}
        Axios.post("http://localhost:3001/create_corp", {
            id: this.state.id,
            password: this.state.password,
        }).then(() => {
            console.log("Corporation data sent!");
        })

        console.log("\ncorporation created")
        console.log(this.state)
        this.clearState(event)
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div className="mainHeader">
                    <h1>Q19: Login</h1>
                </div>
                <div className="formContainer">
                    <form onSubmit={this.handleSubmit}>
                        <div className="formItem">
                            <label>
                                ID:
                            </label>
                            <input type="text" value={this.state.id} onChange={this.handleIDChange} />
                        </div>
                        <div className="formItem">
                            <label>
                                Password:
                            </label>
                            <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
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

export default Login;
