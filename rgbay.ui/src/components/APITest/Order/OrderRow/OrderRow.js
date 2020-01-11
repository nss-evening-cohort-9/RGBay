import React from 'react';
import './OrderRow.scss';
import orderData from '../../../../data/orderData';

class OrderRow extends React.Component {

    deleteOrder = () => {
        orderData.deleteOrder(this.props.orderProp.id).then(this.props.getOrders);
    }

    cancelOrder = () => {
        const updatedOrder = {
            Id: this.props.orderProp.id,
            CustomerId: this.props.orderProp.customerId,
            Total: this.props.orderProp.Total,
            Status: "Cancelled"
        };

        orderData.updateOrder(this.props.orderProp.id, updatedOrder).then(this.props.getOrders);
    }

    resumeOrder = () => {
        const updatedOrder = {
            Id: this.props.orderProp.id,
            CustomerId: this.props.orderProp.customerId,
            Status: "In Progress"
        };

        orderData.updateOrder(this.props.orderProp.id, updatedOrder).then(this.props.getOrders);
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
            </tr>
        )
    }
}

export default OrderRow;
