import React from 'react';

import orderData from '../../data/orderData';
import OrdersRow from '../OrderView/OrdersRow';

class Order extends React.Component {
  state = {
    Order: {}
  }

  getOrderDetails = () => {
    orderData.getOrderByOrderId()
  }

  componentDidMount(){
    const orderId = this.props.params.match.OrderId;
    console.error(orderId);
  }
  render() {
    return (
      <div className="Order">
        <div>Order</div>
        <OrdersRow />
      </div>
    );
  }
}

export default Order;
