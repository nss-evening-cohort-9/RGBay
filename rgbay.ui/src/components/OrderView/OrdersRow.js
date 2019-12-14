import React from 'react';

class OrderRow extends React.Component {


    render() {
        const { orderProp } = this.props;
        return (
            <tr>
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
