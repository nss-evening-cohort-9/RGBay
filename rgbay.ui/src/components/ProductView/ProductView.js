import React from 'react';

import Product from '../Product/Product';

import productData from '../../data/product-data';

import './ProductView.scss';

class ProductView extends React.Component {
  state = {
    products: [],
  }

  buildProducts = () => {
    return this.state.products.map((product) => (
      <Product key={product.id} product={product} />
    ));
  }

  getProducts = () => {
    productData.getProducts()
      .then(products => this.setState({ products }))
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <div className="ProductView mt-5">
        <div>ProductView</div>

        <div className="row mt-5">
          {this.buildProducts()}
        </div>
      </div>
    );
  }
}

export default ProductView;
