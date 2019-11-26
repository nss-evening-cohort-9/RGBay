import React from 'react';

import { 
    Table,
    Button
} from 'reactstrap';

import './OrderTable.scss';
import orderData from '../../../../data/orderData';
import OrderRow from '../OrderRow/OrderRow';


const defaultOrderId = {
    name: '',
    imgUrl: '',
    dateCreated: '',
    description: '',
    uid: '',
};

class OrderTable extends React.Component {
    state = {
        orderState: [],
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

    addOrder = () => {
        const customerId = 1;
        const status = "Ordered"
        const total = Math.floor(Math.random() * Math.floor(1000));

        const newOrder = {
            CustomerId: customerId,
            Total: total,
            Status: status
        }
        orderData.addNewOrder(newOrder).then(this.getOrders());
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
                <Table striped dark responsive>
                    <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">CustomerId</th>
                        <th scope="col">Date</th>
                        <th scope="col">Total</th>
                        <th scope="col">Status</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                        {orderRows}
                    </tbody>
                </Table>
                <Button onClick={this.addOrder}> Add Order </Button>
            </div>
        )
        }
}

export default OrderTable;