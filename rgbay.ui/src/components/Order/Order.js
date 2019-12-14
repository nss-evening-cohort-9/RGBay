import React from 'react';

import orderData from '../../data/orderData';

class Order extends React.Component {
  state = {
    Order: {}
  }

  getOrderDetails = () => {
    orderData.getOrderByOrderId()
  }
  render() {
    return (
      <div className="Order">
        <div>Order</div>
        <OrdersTable />
      </div>
    );
  }
}

export default Order;
