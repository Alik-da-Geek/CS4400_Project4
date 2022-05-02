import React, {Component} from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import "../styles/main.css";
import "../styles/forms.css";

class DisplayCorporationStats extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            rowData: []
        };
    }

    componentDidMount() {
        Axios.get("http://localhost:3001/display_corporation_stats").then(r => {
            const res = r.data;
            this.setState({rowData: res});
        });
    }

    sortTable = (n) => {
        let table, rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
        table = document.getElementById("corpTable");
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
                    <h1>Q22: Display Corporation Stats</h1>
                </div>
                <table className="styled-table" id="corpTable">
                    <thead>
                    <tr>
                    <th onClick={() => this.sortTable(0)}>
                        Corporation ID
                    </th>
                    <th onClick={() => this.sortTable(1)}>
                        Short Name
                    </th>
                    <th onClick={() => this.sortTable(2)}>
                        Formal Name
                    </th>
                    <th onClick={() => this.sortTable(3)}>
                        Number of Banks
                    </th>
                    <th onClick={() => this.sortTable(4)}>
                        Corporation Assets ($)
                    </th>
                    <th onClick={() => this.sortTable(5)}>
                        Total Assets ($)
                    </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.rowData.map(row => <TableRow key={row.corporation_identifier} row={row} />)}
                    </tbody>
                </table>
            </div>
        );
    }
}

class TableRow extends Component {
    render() {
        var row = this.props.row;
        return (
            <tr>
                <td>
                    {row.corporation_identifier}
                </td>
                <td>
                    {row.short_name}
                </td>
                <td>
                    {row.formal_name}
                </td>
                <td>
                    {row.number_of_banks}
                </td>
                <td>
                    {row.corporation_assets}
                </td>
                <td>
                    {row.total_assets}
                </td>
            </tr>
        )
    }
}

export default DisplayCorporationStats;
