import React from 'react';
import OrdersTable from './OrdersTable';

class OrdersView extends React.Component {
  render() {
    return (
      <div className="OrdersView container">
        <h2>Orders</h2>
        <div className="row">
          <OrdersTable />
        </div>
      </div>
    );
  }
}

export default OrdersView;
