import React from 'react'


import { Table, Button } from 'reactstrap';
import orderData from '../../data/orderData';
import OrdersRow from './OrdersRow';

class OrderTable extends React.Component {
    state = {
        orders: []
    }

    getOrders = () => {
        orderData.getOrdersByUid()
            .then((grabbedOrders) => {
                const orderArray = [];
                grabbedOrders.forEach(order => {
                    orderArray.push(order);
                });
                this.setState({ orders: orderArray });
            })
            .catch((err) => {
                console.error('error in OrdersRow.js => getOrders()', err)
            })
    }


    componentDidMount() {
        this.getOrders();
    }

    render() {
        const ordersRows = this.state.orders.map(order => (
            <OrdersRow
                key={`order_${order.id}`}
                order={order}
                getOrders={this.getOrders}
            />
        ));

        return (
            <div className="OrdersTable col">
                <div className="card">
                    <Table striped dark responsive>
                        <thead>
                            <tr>
                                <th scope="col">Order #</th>
                                <th scope="col">Date</th>
                                <th scope="col">Total</th>
                                <th scope="col">Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {ordersRows}
                        </tbody>
                    </Table>
                </div>
                <Button onClick={this.addOrder}> Add Order </Button>
            </div>
        )
    }
}

export default OrderTable;