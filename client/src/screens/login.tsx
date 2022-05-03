import React from "react";
import Axios from 'axios';
import "../styles/main.css";
import "../styles/forms.css";
import { LoginState } from '../types/State'
import { LoginProps } from "../types/props";

class Login extends React.Component<LoginProps, LoginState> {
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
        Axios.post("http://localhost:3001/check_per_type", {
            perID: this.state.id,
            pwd: this.state.password,
        }).then((res) => {
            console.log("Login data recieved!");
            const key = "check_per_type('" + this.state.id + "','" + this.state.password + "')"
            const data = res.data[0][key]
            this.props.setRole(data, this.state.id)
            this.clearState(event)
        })
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
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
