import React from 'react'
import { Table, Button } from 'reactstrap';

class CartOrder extends React.Component {
    render() {
        const { order, orderCheckout } = this.props;
        const orderTotal = (order.total / 100).toFixed(2);
        return (
            <div className="CartOrder">
                <Table striped hover borderless>
                    <thead>
                        <tr>
                            <th scope="col">Order Nuber</th>
                            <th scope="col">Last Updated On</th>
                            <th scope="col">Total</th>
                            <th scope="col">Status</th>
                            <th scope="col">Checkout</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{order.id}</td>
                            <td>{order.date}</td>
                            <td>{orderTotal}</td>
                            <td>{order.status}</td>
                            <td><Button color="success" onClick={() => {orderCheckout(order)}}>Checkout</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </div>

        );
    }
}

export default CartOrder;