import React from 'react';

import { Collapse, Button, CardBody, Card, Form, FormGroup, Input, Label } from 'reactstrap';

import Product from '../Product/Product';

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

  cancelEdit = () => this.setState({ editState: !this.state.editState });

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
    newProduct.ownerId = 1;
    productData.addProduct(newProduct)
      .then(() => this.getProducts())
      .catch(error => console.error(error));
  }

  editProduct = () => {
    const updatedProduct = { ...this.state.product };
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
          <Card>
            <CardBody>
              <Form onSubmit={this.submitForm} >
                <FormGroup>
                  <Label for="product-title">Title</Label>
                  <Input id="product-title" type="text" placeholder="Title" value={product.title} onChange={this.updateTitle} />
                  <Label for="product-category">Category</Label>
                  <Input id="product-category" type="text" placeholder="Category" value={product.category} onChange={this.updateCategory} />
                  <Label for="product-rentalprice">Rental Price</Label>
                  <Input id="product-rentalprice" type="text" placeholder="Rental Price" value={product.rentalPrice} onChange={this.updateRentalPrice} />
                  <Label for="product-salesprice">Sales Price</Label>
                  <Input id="product-salesprice" type="text" placeholder="Sales Price" value={product.salesPrice} onChange={this.updateSalesPrice} />
                </FormGroup>
                <FormGroup check>
                  <Label for="product-rbg" className="mr-5">
                    <Input id="product-rbg" type="checkbox" placeholder="RGB" value={product.isRgb} onChange={this.updateRgb} />
                    RGB
                  </Label>
                  <Label for="product-forsale">
                    <Input id="product-forsale" type="checkbox" placeholder="For Sale?" value={product.isForSale} onChange={this.updateIsForSale} />
                    For Sale?
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label for="product-description">Description</Label>
                  <Input id="product-description" type="textarea" placeholder="Description" value={product.description} onChange={this.updateDescription} />
                </FormGroup>
                <FormGroup>
                  <Label for="product-image">Image</Label>
                  <Input id="product-image" type="text" placeholder="Image URL" value={product.imageUrl} onChange={this.updateImageUrl} />
                </FormGroup>
                <Button type="submit">Submit</Button>
                { cancelButton }
              </Form>
            </CardBody>
          </Card>
        </div>
        <div className="row">
          {this.buildProducts()}
        </div>
      </div>
    );
  }
}

export default ProductView;
