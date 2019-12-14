import React from 'react';

import './ProductCategoryContainer.scss';
import productCategoryData from '../../../../data/productCategoryData';
import ProductCategoryForm from '../ProductCategoryForm/ProductCategoryForm';
import TestProductCategory from '../TestProductCategory/TestProductCategory';

const defaultProductCategory = {
  id: '',
  name: ''
};

class ProductCategoryContainer extends React.Component {

  state = {
    productCategories: [],
    isEditing: false,
    formProductCategory: defaultProductCategory,
  }

  componentDidMount() {
    this.updateData();
  }

  productCategoryFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.isEditing) {
      this.updateCategory(this.state.formProductCategory)
    } else {
      this.addCategory(this.state.formProductCategory);
    }
  }

  updateCategory = (updatedProductCategory) => {
    productCategoryData.updateProductCategory(updatedProductCategory.id, updatedProductCategory)
      .then(() => {
        this.setState({ isEditing: false, formProductCategory: defaultProductCategory });
        this.updateData();
      })
      .catch(error => console.error('unable to update ProductCategory', error));
  }

  addCategory = (newProductCategory) => {
    productCategoryData.postProductCategory(newProductCategory)
      .then(() => {
        this.setState({ isEditing: false, formProductCategory: defaultProductCategory });
        this.updateData();
      })
      .catch(error => console.error('unable to add ProductCategory', error));
  }

  editProductCategory = (productCategoryToEdit) => {
    const productCategory = {...productCategoryToEdit};
    this.setState({ isEditing: true, formProductCategory: productCategory });
  }

  deleteProductCategory = (id) => {
    productCategoryData.deleteProductCategory(id)
      .then(() => this.updateData())
      .catch(error => console.error('unable to delete ProductCategory', error));
  }

  updateData() {
    productCategoryData.getAllProductCategories()
      .then(productCategoriesData => this.setState({ productCategories: productCategoriesData }))
      .catch(error => console.error(`could not get ProductCategories`, error));
  }

  productCategoryFormChange = (e) => {
    const newFormProductCategory = this.state.formProductCategory;
    newFormProductCategory.name = e.target.value;
    this.setState({ formProductCategory: newFormProductCategory });
  }

  render() {
    const productCategoryString = 'productCategory';
    const testProductCategories = this.state.productCategories.map(productCategory => (
      <TestProductCategory
        key={productCategoryString + productCategory.id}
        productCategory={productCategory}
        update={this.updateData}
        deleteProductCategory={this.deleteProductCategory}
        editProductCategory={this.editProductCategory}
      />
    ));
    return (
      <div className="ProductCategoryContainer card container">
        <h2>ProductCategory Data</h2>
        <ProductCategoryForm
          key={`productCategoryForm`}
          formProductCategory={this.state.formProductCategory}
          productCategoryFormChange={this.productCategoryFormChange}
          productCategoryFormSubmit={this.productCategoryFormSubmit}
        />
        <div className="row">
          {testProductCategories}
        </div>
      </div>
    )
  }
}

export default ProductCategoryContainer;