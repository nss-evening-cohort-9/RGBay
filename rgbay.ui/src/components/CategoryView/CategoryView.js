import React from 'react';

import Category from '../CategoryView/CategoryCard';
import productCategoryData from '../../data/productCategoryData';
import './CategoryView.scss';

class CategoryView extends React.Component {
  state = {
    categories: [],
  }

  showProduct = (productId) => {
    this.props.history.push(`/product/${productId}`);
  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    productCategoryData.getAllProductCategories()
      .then(categories => this.setState({ categories }))
      .catch(error => console.error(error));
  }

  buildCategories = () => {
    return this.state.categories.map((category) => {
      const categoryToBuild = (
        <Category key={category.id} category={category} isChildComponent={true} showProduct={this.showProduct} />);
      return categoryToBuild
    });
  }

  render() {
    return (
      <div className="CategoryView container">
        <h2>Product Categories</h2>
        <div className="row ">
          {this.buildCategories()}
        </div>
      </div>
    );
  }
}

export default CategoryView;
