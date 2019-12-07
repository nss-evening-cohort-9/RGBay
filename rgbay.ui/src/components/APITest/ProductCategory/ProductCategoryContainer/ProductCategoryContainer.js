import React from 'react';
// import {
//   Button
// } from 'reactstrap'; 

import './ProductCategoryContainer.scss';
import productCategoryData from '../../../../data/productCategoryData';
import ProductCategoryForm from '../ProductCategoryForm/ProductCategoryForm';
import TestProductCategory from '../TestProductCategory/TestProductCategory';

class ProductCategoryContainer extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = { productCategories: [] };
  //   this.updateData = this.updateData.bind(this);
  // }

  state = {
    productCategories: [],
    isEditing: false,
  }

  componentDidMount() {
    this.updateData();
  }

  formSubmit = (freshProductCategory) => {
    if (this.state.isEditing) {
      // this.updateCategory
    } else {
      this.addCategory(freshProductCategory);
    }
  }

  addCategory = (newProductCategory) => {
    productCategoryData.postProductCategory(newProductCategory)
      .then(() => this.updateData())
      .catch(error => console.error('unable to add ProductCategory', error));
  }

  updateCategory = (updatedProductCategory) => {
    this.setState({isEditing: false});
    productCategoryData.updateProductCategory(updatedProductCategory.id, updatedProductCategory)
      .then(() => this.updateData())
      .catch(error => console.error('unable to update ProductCategory', error));
  }

  deleteProductCategory = (id) => {
    productCategoryData.deleteProductCategory(id)
      .then(() => this.updateData())
      .catch(error => console.error('unable to delete ProductCategory', error));
  }

  updateData() {
    productCategoryData.getAllProductCategories()
      // .then((productCategories) => {
      //   let freshProductCategories = [...productCategories];
      //   this.setState({ productCategories: freshProductCategories });
      // })
      .then(productCategories => this.setState({ productCategories }))
      .catch(error => console.error(`could not get ProductCategories`, error));
  }

  render() {
    const testProductCategories = this.state.productCategories.map(productCategory => (
      <TestProductCategory
        key={`productCategory${productCategory.id}`}
        productCategory={productCategory}
        update={this.updateData}
        deleteProductCategory={this.deleteProductCategory}
      />
    ));
    return (
      <div className="ProductCategoryContainer card container">
        <h2>ProductCategory Data</h2>
        {/* <Button onClick={() => this.updateData()}>Update Data</Button> */}
        <ProductCategoryForm key={`productCategoryForm`}
          formSubmit={this.formSubmit} />
        <div className="row">
          {testProductCategories}
        </div>
      </div>
    )
  }
}

export default ProductCategoryContainer;