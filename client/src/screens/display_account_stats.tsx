import React from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import "../styles/main.css";
import "../styles/forms.css";

class DisplayAccountStats extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    handleLoad() {
        Axios.get("http://localhost:3001/display_account_stats").then(r => {
            console.log(r.data)
        });
    }

    render() {
        return (
            <div className="container">
                <div className="mainHeader">
                    <h6><Link to="../">Home</Link></h6>
                    <h1>Q1: Create Corporation</h1>
                </div>
                <div>
                    <button onClick={this.handleLoad} className="formSubmit">
                        Load
                    </button>
                </div>
            </div>
        );
    }
}

export default DisplayAccountStats;
