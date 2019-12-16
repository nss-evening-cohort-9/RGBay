import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
} from 'reactstrap';
import './ProductCategoryForm.scss';

class ProductCategoryForm extends React.Component {

  render() {
    return (
      <Form onSubmit={this.props.productCategoryFormSubmit}>
        <Row form>
          <Col>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                placeholder="ex: Game"
                value={this.props.formProductCategory.name}
                onChange={this.props.productCategoryFormChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="submit">{this.props.formProductCategory.id==="" ? 'Add Category' : 'Edit Category'}</Label>
              <Button id="submit" type="submit" color="primary" className="ml-auto mr-auto d-block">{this.props.formProductCategory.id==="" ? 'Create' : 'Update'}</Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ProductCategoryForm;
