import React from 'react';

import ProductViewCard from '../ProductView/ProductViewCard';
import productData from '../../data/product-data';

import './CategoryView.scss';

class CategoryCard extends React.Component {
  state = {
    products: [],
  }

  showProduct = (productId) => {
    const { isChildComponent, showProduct } = this.props;
    if (isChildComponent) {
      showProduct(productId);
    } else {
      this.props.history.push(`/product/${productId}`);
    }
  }

  componentDidMount() {
    this.getProducts(this.props.category.id);
  }

  getProducts = (categoryId) => {
    productData.getRecentProductsByCategory(categoryId)
      .then(products => this.setState({ products }))
      .catch(error => console.error(error));
  }

  buildProducts = () => {
    return this.state.products.map((product) => {
      const productToBuild = (
        <ProductViewCard key={product.id} product={product} showProduct={this.showProduct} />);
      return productToBuild
    });
  }

  render() {
    const { category } = this.props;
    return (
      <div className="CategoryCard col-lg-4 col-md-6 col-sm-12">
        <div className="card">
          <div className="card-header">
            <h3>{category.name}</h3>
          </div>
          <div className="card-body">
          {this.buildProducts()}
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryCard;
