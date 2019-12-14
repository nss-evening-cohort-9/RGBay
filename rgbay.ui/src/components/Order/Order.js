import React from 'react';

import OrdersTable from '../OrderView/OrdersTable';

class Order extends React.Component {
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
