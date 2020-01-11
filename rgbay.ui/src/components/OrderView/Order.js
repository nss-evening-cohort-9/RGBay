import React from 'react';

import orderProductData from '../../data/orderProductData';
import OrdersRow from './OrdersRow';
import OrderItem from './OrderItem';

import { Table } from 'reactstrap';

class Order extends React.Component {
  state = {
    order: {},
    orderItems: []
  }

  getOrderDetails = () => {
    const orderId = this.props.match.params.id;
    orderProductData.getOrderDetails(orderId)
      .then((orderDetails) => {
        this.setState({
          order: orderDetails.cartOrder,
          orderItems: orderDetails.cartItems
        })
      }).catch(err => console.error(err));
  }

  componentDidMount() {
    this.getOrderDetails();
  }
  render() {
    const { order } = this.state;
    const orderRow = <OrdersRow
      key={`order_details_${order.id}`}
      order={order}
      getOrderDetails={this.getOrderDetails}
    />;
    const itemsInOrder = this.state.orderItems.map(orderItem => (
      <OrderItem
        key={`_user_orderItem_${this.state.cartOrderId}_opid_${Object.values(orderItem)[0]}`}
        product={orderItem.product}
        duration={orderItem.duration}
        orderProductId={Object.values(orderItem)[0]}
        getCart={this.getCart}
      />
    ));
    return (
      <div className="Order container">
        <h2>Order</h2>
        <div className="row">
          <div className="col">
            <div className="card">
              <Table striped responsive>
                <thead>
                  <tr>
                    <th scope="col">Order #</th>
                    <th scope="col">Date</th>
                    <th scope="col">Total</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orderRow}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <h2>Items</h2>
        <div className="row">
          <div className="col">
            <div className="card">
              <Table striped responsive>
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Rented/Purchased</th>
                    <th scope="col">Days Rented</th>
                    <th scope="col">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsInOrder}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Order;
