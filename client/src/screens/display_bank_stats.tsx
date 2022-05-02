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

    sortTable = (n) => {
        let table, rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
        table = document.getElementById("BankTable");
        switching = true;
        dir = "asc";
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchCount ++;
            } else {
                if (switchCount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

    render() {
        return (
            <div className="container">
                <div className="mainHeader">
                    <h6><Link to="../">Home</Link></h6>
                    <h1>Q21: Display Bank Stats</h1>
                </div>
                <table className="styled-table" id="BankTable">
                    <thead>
                        <tr>
                            <th onClick={() => this.sortTable(0)}>
                                Bank ID
                            </th>
                            <th onClick={() => this.sortTable(1)}>
                                Corporation Name
                            </th>
                            <th onClick={() => this.sortTable(2)}>
                                Bank Name
                            </th>
                            <th onClick={() => this.sortTable(3)}>
                                Street
                            </th>
                            <th onClick={() => this.sortTable(4)}>
                                City
                            </th>
                            <th onClick={() => this.sortTable(5)}>
                                State
                            </th>
                            <th onClick={() => this.sortTable(6)}>
                                Zip
                            </th>
                            <th onClick={() => this.sortTable(7)}>
                                Number of Accounts
                            </th>
                            <th onClick={() => this.sortTable(8)}>
                                Bank Assets ($)
                            </th>
                            <th onClick={() => this.sortTable(9)}>
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
