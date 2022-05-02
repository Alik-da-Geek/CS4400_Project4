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

    sortTable = (n) => {
        let table, rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
        table = document.getElementById("accountTable");
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
                    <h1>Q20: Display Account Stats</h1>
                </div>
                <table className="styled-table" id="accountTable">
                    <thead>
                        <tr>
                            <th onClick={() => this.sortTable(0)}>
                                Bank
                            </th>
                            <th onClick={() => this.sortTable(1)}>
                                Account ID
                            </th>
                            <th onClick={() => this.sortTable(2)}>
                                Account Balance ($)
                            </th>
                            <th onClick={() => this.sortTable(3)}>
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
