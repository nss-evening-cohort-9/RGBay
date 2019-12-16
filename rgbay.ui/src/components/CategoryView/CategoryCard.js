import React from 'react';

import productData from '../../data/product-data';

import './CategoryView.scss';

class CategoryCard extends React.Component {
  state = {
    products: [],
  }

  componentDidMount() {
    this.getProducts(this.props.category.id);
  }

  getProducts = (categoryId) => {
    productData.getRecentProductsByCategory(categoryId)
      .then(products => this.setState({ products }))
      .catch(error => console.error(error));
  }

  render() {
    const { category } = this.props;
    return (
      <div className="CategoryCard col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div className="card">
          <div className="card-header">
            <h3>{category.name}</h3>
          </div>
          <div className="card-body">
            <p>{category.name}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryCard;
