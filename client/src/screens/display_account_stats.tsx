import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import "../styles/main.css";
import "../styles/forms.css";

class DisplayAccountStats extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            rowData: []
        };
    }

    componentDidMount() {
        Axios.get("http://localhost:3001/display_account_stats").then(r => {
            const res = r.data;
            this.setState({ rowData: res });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="mainHeader">
                    <h6><Link to="../">Home</Link></h6>
                    <h1>Q20: Display Account Stats</h1>
                </div>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>
                                Bank
                            </th>
                            <th>
                                Account ID
                            </th>
                            <th>
                                Account Balance ($)
                            </th>
                            <th>
                                Number of Owners
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.rowData.map(row => <TableRow key={row.name_of_bank + row.account_identifier} row={row} />)}
                    </tbody>
                </table>
            </div>
        );
    }
}

class TableRow extends Component<{ row }, {}> {
    render() {
        var row = this.props.row;
        return (
            <tr>
                <td>
                    {row.name_of_bank}
                </td>
                <td>
                    {row.account_identifier}
                </td>
                <td>
                    {row.account_assets}
                </td>
                <td>
                    {row.account_owners}
                </td>
            </tr>
        )
    }
}

export default DisplayAccountStats;
