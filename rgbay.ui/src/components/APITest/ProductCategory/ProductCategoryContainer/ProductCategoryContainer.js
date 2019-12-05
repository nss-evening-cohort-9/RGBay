import React from 'react';
// import {
//   Button
// } from 'reactstrap'; 

import './ProductCategoryContainer.scss';
import productCategoryData from '../../../../data/productCategoryData';
import ProductCategoryForm from '../ProductCategoryForm/ProductCategoryForm';
import TestProductCategory from '../TestProductCategory/TestProductCategory';

class ProductCategoryContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { productCategories: [] };
    this.updateData = this.updateData.bind(this);
  }

  updateData() {
    productCategoryData.getAllProductCategories()
      .then((productCategories) => {
        let freshProductCategories = [...productCategories];
        this.setState({ productCategories: freshProductCategories });
      })
      .catch(error => console.error(`could not get ProductCategories`, error));
  }

  componentDidMount() {
    this.updateData();
  }

  render() {
    const testProductCategories = this.state.productCategories.map(productCategory => (
      <TestProductCategory
        key={`productCategory${productCategory.id}`}
        productCategory={productCategory}
        update={this.updateData}
      />
    ));
    return (
      <div className="ProductCategoryContainer card container">
        <h2>ProductCategory Data</h2>
        {/* <Button onClick={() => this.updateData()}>Update Data</Button> */}
        <ProductCategoryForm key={`productCategoryForm`}
          update={this.updateData} />
        <div className="row">
          {testProductCategories}
        </div>
      </div>
    )
  }
}

export default ProductCategoryContainer;