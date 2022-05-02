import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import "../styles/main.css";
import "../styles/forms.css";

class DisplayBankStats extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            rowData: []
        };
    }

    componentDidMount() {
        Axios.get("http://localhost:3001/display_bank_stats").then(r => {
            const res = r.data;
            this.setState({ rowData: res });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="mainHeader">
                    <h6><Link to="../">Home</Link></h6>
                    <h1>Q21: Display Bank Stats</h1>
                </div>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>
                                Bank ID
                            </th>
                            <th>
                                Corporation Name
                            </th>
                            <th>
                                Bank Name
                            </th>
                            <th>
                                Street
                            </th>
                            <th>
                                City
                            </th>
                            <th>
                                State
                            </th>
                            <th>
                                Zip
                            </th>
                            <th>
                                Number of Accounts
                            </th>
                            <th>
                                Bank Assets ($)
                            </th>
                            <th>
                                Total Assets ($)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.rowData.map(row => <TableRow key={row.bank_identifier} row={row} />)}
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
                    {row.bank_identifier}
                </td>
                <td>
                    {row.name_of_corporation}
                </td>
                <td>
                    {row.name_of_bank}
                </td>
                <td>
                    {row.street}
                </td>
                <td>
                    {row.city}
                </td>
                <td>
                    {row.state}
                </td>
                <td>
                    {row.zip}
                </td>
                <td>
                    {row.number_of_accounts}
                </td>
                <td>
                    {row.bank_assets}
                </td>
                <td>
                    {row.total_assets}
                </td>
            </tr>
        )
    }
}

export default DisplayBankStats;
