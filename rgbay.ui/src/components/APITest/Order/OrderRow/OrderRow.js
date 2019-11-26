import React from 'react';
import { Button } from 'reactstrap';
import './OrderRow.scss';
import orderData from '../../../../data/orderData';
import OrderTable from '../OrderTable/OrderTable';

class OrderRow extends React.Component {

    deleteOrder = () => {
        orderData.deleteOrder(this.props.orderProp.id);
    }

    render() {
        const { orderProp } = this.props;
        return (
            <tr>
            <td>{orderProp.id}</td>
            <td>{orderProp.customerId}</td>
            <td>{orderProp.date}</td>
            <td>{orderProp.total}</td>
            <td>{orderProp.status}</td>
            <td><Button>Cancel this order</Button></td>
            <td><Button>Resume this order</Button></td>
            <td><Button onClick={this.deleteOrder} >Delete Order</Button></td>
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