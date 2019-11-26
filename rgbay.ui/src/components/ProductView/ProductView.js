import React from 'react';

import Product from '../Product/Product';
import ProductCards from '../APITest/ProductCard/ProductCard';

import productData from '../../data/product-data';

import './ProductView.scss';

class ProductView extends React.Component {
  state = {
    products: [],
    testMode: false,
  }

  checkTestMode = () => {
    const { testMode } = this.props;
    if (testMode) this.setState({ testMode });
    this.getProducts();
  }

  buildProducts = () => {
    const { testMode } = this.state;
    if (!testMode) {
      return this.state.products.map((product) => (
        <Product key={product.id} product={product} />
      ));
    } else {
      return this.state.products.map((product) => (
        <ProductCards key={product.id} product={product} deleteProduct={this.deleteProduct} />
      ));
    }
  }

  getProducts = () => {
    productData.getProducts()
      .then(products => this.setState({ products }))
      .catch(error => console.error(error));
  }

  deleteProduct = (productId) => {
    productData.deleteProduct(productId)
      .then(() => this.getProducts())
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.checkTestMode();
  }

  render() {
    return (
      <div className="ProductView container">
        <h2>ProductView</h2>

        <div className="row">
          {this.buildProducts()}
        </div>
      </div>
    );
  }
}

export default ProductView;
