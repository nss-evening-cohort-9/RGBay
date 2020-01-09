import React from 'react';
import OrdersTable from './OrdersTable';

class OrdersView extends React.Component {
  render() {
    return (
      <div className="OrdersView">
        <h2>Orders View</h2>
        <OrdersTable />
      </div>
    );
  }
}

export default OrdersView;
