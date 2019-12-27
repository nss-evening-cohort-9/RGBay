import React from 'react'
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class CartOrder extends React.Component {
    render() {
        const { orderProp } = this.props;
        const orderLink = `/order/${orderProp.id}`;
        return (
            <div className="CartOrder">
                <Table striped hover borderless>
                    <thead>
                        <tr>
                            <th scope="col">Order</th>
                            <th scope="col">Order Nuber</th>
                            <th scope="col">Last Updated On</th>
                            <th scope="col">Total</th>
                            <th scope="col">Status</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Link to={orderLink}>{orderProp.id}</Link></td>
                            <td>{orderProp.id}</td>
                            <td>{orderProp.date}</td>
                            <td>{orderProp.total}</td>
                            <td>{orderProp.status}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

        );
    }
}

export default CartOrder;