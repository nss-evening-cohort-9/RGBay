import React from 'react';

import './OrderRow.scss';

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
            <button>Cancel this order</button>
            <button>Delete Order</button>
            </tr>
        )
    }
}

export default OrderRow;

// [Id] INT NOT NULL,
// [CustomerId] INT
// [Date] DATETIME,
// [Total] INT NOT NULL,
// [Status] NVARCHAR(50)