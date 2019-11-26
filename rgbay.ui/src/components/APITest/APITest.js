import React, { Component } from 'react';
import './APITest.scss';

import PaymentTypeTable from './PaymentType/PaymentTypeTable/PaymentTypeTable';
import ProductCategoryContainer from './ProductCategory/ProductCategoryContainer/ProductCategoryContainer';
import ProductView from '../ProductView/ProductView';
import UserProfile from '../Profile/Profile';

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
        <div>
          <ProductCategoryContainer />
        </div>
        <div className="card">
          <UserProfile />
        </div>
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