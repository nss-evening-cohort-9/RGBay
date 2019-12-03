import React from 'react';

import { Collapse, Button, CardBody, Card, Form, FormGroup, Input, Label } from 'reactstrap';

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


class ProductForm extends React.Component {
  render() {
    const cancelButton = editState ? (<Button type="button" onClick={this.cancelEdit}>Cancel</Button>) : ('');
    return (
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
    );
  }
}

export default ProductForm
