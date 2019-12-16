import React from 'react';

import Product from './ProductViewCard';
import ProductForm from './ProductViewForm';

import productData from '../../data/product-data';

import './ProductView.scss';

const defaultProduct = {
  title: '',
  category: '',
  rentalPrice: '',
  salesPrice: '',
  isForSale: false,
  isRgb: false,
  description: '',
  imageUrl: '',
}

class ProductView extends React.Component {
  state = {
    products: [],
    product: defaultProduct,
    editState: false,
    isSeller: false,
  }

  showProduct = (productId) => {
    const { isChildComponent, showProduct } = this.props;
    if (isChildComponent) {
      showProduct(productId);
    } else {
      this.props.history.push(`/product/${productId}`);
    }
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

  cancelEdit = () => this.setState({ product: defaultProduct, editState: false });

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
    const productClass = this.props.rows ? ('ProductViewCard col-12 mb-5') : ('ProductViewCard col-4 mb-5')
    return this.state.products.map((product) => {
      const productToBuild = (
        <Product
          key={product.id}
          product={product}
          deleteProduct={this.deleteProduct}
          stageEdit={this.stageEdit}
          isSeller={this.state.isSeller}
          showProduct={this.showProduct}
          productClass={productClass} />);
      if (this.props.match) {
        // console.error(this.props.match.params.searchCriteria);
        return productToBuild
      } else {
        return productToBuild
      }
    });
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
    this.cancelEdit();
    productData.updateProduct(updatedProduct.id, updatedProduct)
      .then(() => this.getProducts())
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.checkViewerType();
  }

  render() {
    const { product, editState, isSeller } = this.state;
    const productSellerForm = isSeller ?
      (<ProductForm 
        product={product}
        editState={editState}
        updateTitle={this.updateTitle}
        updateCategory={this.updateCategory}
        updateRentalPrice={this.updateRentalPrice}
        updateSalesPrice={this.updateSalesPrice}
        updateRgb={this.updateRgb}
        updateIsForSale={this.updateIsForSale}
        updateDescription={this.updateDescription}
        updateImageUrl={this.updateImageUrl}
        cancelEdit={this.cancelEdit}
        submitForm={this.submitForm}
      />) : ('');
    return (
      <div className="ProductView container">
        <div className="mt-3">
          {(this.props.showTitle ? (<h2 className="d-inline">ProductView</h2>) : (''))}
          {productSellerForm}
        </div>
        <div className="row">
          {this.buildProducts()}
        </div>
      </div>
    );
  }
}

export default ProductView;
