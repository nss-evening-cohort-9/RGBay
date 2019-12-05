import React from 'react';

import { Button, CardBody, Card, Form, FormGroup, Input, Label } from 'reactstrap';


class ProductViewForm extends React.Component {
  render() {
    const {
      product,
      editState,
      updateTitle,
      updateCategory,
      updateRentalPrice,
      updateSalesPrice,
      updateRgb,
      updateIsForSale,
      updateDescription,
      updateImageUrl,
      cancelEdit,
      submitForm,
    } = this.props;
    const cancelButton = editState ? (<Button type="button" onClick={cancelEdit}>Cancel</Button>) : ('');
    return (
      <Card>
        <CardBody>
          <Form onSubmit={submitForm} >
            <FormGroup>
              <Label for="product-title">Title</Label>
              <Input id="product-title" type="text" placeholder="Title" value={product.title} onChange={updateTitle} />
              <Label for="product-category">Category</Label>
              <Input id="product-category" type="text" placeholder="Category" value={product.category} onChange={updateCategory} />
              <Label for="product-rentalprice">Rental Price</Label>
              <Input id="product-rentalprice" type="text" placeholder="Rental Price" value={product.rentalPrice} onChange={updateRentalPrice} />
              <Label for="product-salesprice">Sales Price</Label>
              <Input id="product-salesprice" type="text" placeholder="Sales Price" value={product.salesPrice} onChange={updateSalesPrice} />
            </FormGroup>
            <FormGroup check>
              <Label for="product-rbg" className="mr-5">
                <Input id="product-rbg" type="checkbox" placeholder="RGB" value={product.isRgb} onChange={updateRgb} />
                RGB
              </Label>
              <Label for="product-forsale">
                <Input id="product-forsale" type="checkbox" placeholder="For Sale?" value={product.isForSale} onChange={updateIsForSale} />
                For Sale?
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="product-description">Description</Label>
              <Input id="product-description" type="textarea" placeholder="Description" value={product.description} onChange={updateDescription} />
            </FormGroup>
            <FormGroup>
              <Label for="product-image">Image</Label>
              <Input id="product-image" type="text" placeholder="Image URL" value={product.imageUrl} onChange={updateImageUrl} />
            </FormGroup>
            <Button type="submit">Submit</Button>
            {cancelButton}
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default ProductViewForm;
