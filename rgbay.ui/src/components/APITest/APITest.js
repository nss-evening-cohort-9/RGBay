import React, { Component } from 'react';
import './APITest.scss';

import PaymentTypeTable from './PaymentType/PaymentTypeTable/PaymentTypeTable';
import ProductView from '../ProductView/ProductView';

class APITest extends Component {
  state = {
    displayValues: []
  }

  render() {
    return (
      <div className="APITest col">
        <div className="card">
          <PaymentTypeTable />
        </div>
        {/* <div className="card">
          <UserTable />
        </div> */}
        <div className="card">
          <ProductView />
        </div>
        {/* <div className="card">
          <OrderTable />
        </div> */}
      </div>
    );
  }
}

export default APITest;