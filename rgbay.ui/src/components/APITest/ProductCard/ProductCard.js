import React from 'react';

import './ProductCard.scss';

class ProductCard extends React.Component {
  deleteProduct = () => {
    const { deleteProduct, product } = this.props;
    deleteProduct(product.id)
  }
  render() {
    const { product } = this.props;
    return (
      <div className="Product col-12">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div></div>
              <i className="fas fa-times pointer" onClick={this.deleteProduct}></i>
            </div>
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

export default ProductCard;
