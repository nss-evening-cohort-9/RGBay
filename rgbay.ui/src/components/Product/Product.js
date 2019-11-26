import React from 'react';

import './Product.scss';

class Product extends React.Component {
  render() {
    const { product } = this.props;
    return (
      <div className="Product col-12">
        <div className="card">
          <div className="card-body">
            <div>{product.title}</div>
            <div>{product.description}</div>
            <div>{product.rentalPrice}</div>
            <div>{product.salesPrice}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
