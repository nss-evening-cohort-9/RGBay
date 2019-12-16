import React from 'react';

import { Link } from 'react-router-dom';

class OrderRow extends React.Component {


    render() {
        const { orderProp } = this.props;
        const orderLink = `/order/${orderProp.id}`;
        return (
            <tr>
            <td><Link to={orderLink}>{orderProp.id}</Link></td>
            <td>{orderProp.id}</td>
            <td>{orderProp.customerId}</td>
            <td>{orderProp.date}</td>
            <td>{orderProp.total}</td>
            <td>{orderProp.status}</td>
            </tr>
        )
    }
}

export default OrderRow;
