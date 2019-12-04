import React from 'react';

import Product from '../Product/Product';
import ProductForm from './ProductForm';

import productData from '../../data/product-data';

import './ProductView.scss';

class ProductView extends React.Component {
  state = {
    products: [],
    editState: false,
    isSeller: true,
    product: defaultProduct,
  }

  submitForm = (event) => {
    event.preventDefault();
    if (this.state.editState) {
      this.editProduct();
    } else {
      this.addProduct();
    }
  }

  stageEdit = (productId, product) => {
    product.id = productId;
    this.setState({ product, editState: true });
  }

  cancelEdit = () => this.setState({ editState: !this.state.editState, product: defaultProduct });

  updateProductForm = (field, event) => {
    const { value, type, checked } = event.target;
    const product = { ...this.state.product };
    product[field] = type === 'text' || type === 'textarea' ? (value) : (checked);
    this.setState({ product });
  }

  updateTitle = event => this.updateProductForm('title', event);
  updateCategory = event => this.updateProductForm('category', event);
  updateRentalPrice = event => this.updateProductForm('rentalPrice', event);
  updateSalesPrice = event => this.updateProductForm('salesPrice', event);
  updateRgb = event => this.updateProductForm('isRgb', event);
  updateIsForSale = event => this.updateProductForm('isForSale', event);
  updateDescription = event => this.updateProductForm('description', event);
  updateImageUrl = event => this.updateProductForm('imageUrl', event);

  // toggle = () => this.setState({ isOpen: !this.state.isOpen });

  checkViewerType = () => {
    const { isSeller } = this.props;
    if (isSeller) this.setState({ isSeller });
    this.getProducts();
  }

  buildProducts = () => {
    return this.state.products.map((product) => (
      <Product key={product.id} product={product} deleteProduct={this.deleteProduct} stageEdit={this.stageEdit} />
    ));
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

  addProduct = () => {
    const newProduct = { ...this.state.product };
    this.setState({ product: defaultProduct });
    newProduct.ownerId = 1;
    productData.addProduct(newProduct)
      .then(() => this.getProducts())
      .catch(error => console.error(error));
  }

  editProduct = () => {
    const updatedProduct = { ...this.state.product };
    this.setState({ product: defaultProduct });
    productData.updateProduct(updatedProduct.id, updatedProduct)
      .then(() => this.getProducts())
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.checkViewerType();
  }

  render() {
    const { product, editState } = this.state;
    const cancelButton = editState ? (<Button type="button" onClick={this.cancelEdit}>Cancel</Button>) : ('');
    return (
      <div className="ProductView container">
        <div className="mt-3">
          <h2 className="d-inline">ProductView</h2>

        </div>
        <div className="row">
          {this.buildProducts()}
        </div>
      </div>
    );
  }
}

export default ProductView;
