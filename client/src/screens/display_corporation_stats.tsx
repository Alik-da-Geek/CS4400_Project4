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

    render() {
        return (
            <div className="container">
                <div className="mainHeader">
                    <h6><Link to="../">Home</Link></h6>
                    <h1>Q22: Display Corporation Stats</h1>
                </div>
                <table style={{ width: 1000 }}>
                    <thead>
                    <th>
                        Corporation ID
                    </th>
                    <th>
                        Short Name
                    </th>
                    <th>
                        Formal Name
                    </th>
                    <th>
                        Number of Banks
                    </th>
                    <th>
                        Corporation Assets ($)
                    </th>
                    <th>
                        Total Assets ($)
                    </th>
                    </thead>
                    <tbody>
                    {this.state.rowData.map(row => <TableRow row={row} />)}
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
