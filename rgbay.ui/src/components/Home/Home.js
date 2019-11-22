import React, { Component } from 'react';
import './Home.scss';

import PaymentTypeTable from '../APITest/PaymentType/PaymentTypeTable/PaymentTypeTable';

class Home extends Component {
  state = {
    displayValues: []
  }

  render() {
    return (
      <div className="Home col">
        <div className="card">
          <PaymentTypeTable />
        </div>
        {/* <div className="card">
          <UserTable />
        </div>
        <div className="card">
          <ProductTable />
        </div>
        <div className="card">
          <OrderTable />
        </div> */}
      </div>
    );
  }
}

export default Home;