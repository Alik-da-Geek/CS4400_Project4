import React, {Component} from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import "../styles/main.css";
import "../styles/forms.css";

class DisplayCustomerStats extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            rowData: []
        };
    }

    componentDidMount() {
        Axios.get("http://localhost:3001/display_customer_stats").then(r => {
            const res = r.data;
            this.setState({rowData: res});
        });
    }

    render() {
        return (
            <div className="container">
                <div className="mainHeader">
                    <h6><Link to="../">Home</Link></h6>
                    <h1>Q23: Display Customer Stats</h1>
                </div>
                <table className="styled-table">
                    <thead>
                    <tr>
                    <th>
                        Customer ID
                    </th>
                    <th>
                        TAX ID
                    </th>
                    <th>
                        Customer Name
                    </th>
                    <th>
                        Date of Birth
                    </th>
                    <th>
                        Joined Date
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
                        Customer Assets ($)
                    </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.rowData.map(row => <TableRow key={row.person_identifier} row={row} />)}
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
                    {row.person_identifier}
                </td>
                <td>
                    {row.tax_identifier}
                </td>
                <td>
                    {row.customer_name}
                </td>
                <td>
                    {new Date(row.date_of_birth).toDateString()}
                </td>
                <td>
                    {new Date(row.joined_system).toDateString()}
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
                    {row.customer_assets}
                </td>
            </tr>
        )
    }
}

export default DisplayCustomerStats;
