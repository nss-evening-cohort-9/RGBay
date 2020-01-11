import React from 'react';
import { Link } from 'react-router-dom';

class OrderRow extends React.Component {


    render() {
        const { order } = this.props;
        const orderDetailsLink = `/order/${order.id}`;
        const orderTotal = (order.total / 100).toFixed(2);
        return (
            <tr>
                <td><Link to={orderDetailsLink}>{order.id}</Link></td>
                <td>{order.date}</td>
                <td>{orderTotal}</td>
                <td>{order.status}</td>
            </tr>
        )
    }
}

export default OrderRow;
