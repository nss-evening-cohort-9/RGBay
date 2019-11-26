import React from 'react';

import { Table } from 'reactstrap';

import './OrderTable.scss';
import orderData from '../../../../data/orderData';
import OrderRow from '../OrderRow/OrderRow';

class OrderTable extends React.Component {
    state = {
        orderState: []
    }

    getOrders = () => {
        orderData.getOrderData()
            .then((grabbedOrders) => {
                const orderArray = [];

                grabbedOrders.forEach(order => {
                    orderArray.push(order);
                });

                this.setState({ orderState: orderArray });
            })
            .catch((err) => {
                console.error('error in OrderRow.js => getOrders()' ,err)
            })
    }


    componentDidMount() {
        this.getOrders();
    }

    render() {

        const orderRows = this.state.orderState.map(orderProp => (
            <OrderRow
            key={orderProp.id}
            orderProp={orderProp}
            />
        ));
        return (
            <div>
            <h2>Order</h2>
            <Table striped responsive>
                <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">CustomerId</th>
                    <th scope="col">Date</th>
                    <th scope="col">Total</th>
                    <th scope="col">Status</th>
                    <th><button>Add Order</button></th>
                </tr>
                </thead>
                <tbody>
                    {orderRows}
                </tbody>
            </Table>
            </div>
        )
        }
}

export default OrderTable;