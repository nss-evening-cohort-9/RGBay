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
import productCategoryData from '../../../../data/productCategoryData';

const defaultProductCategory = {
  id: '',
  name: ''
};

class ProductCategoryForm extends React.Component {

  state = {
    newProductCategory: defaultProductCategory,
  }

  formFieldStringState = (name, e) => {
    const tempProductCategory = { ...this.state.newProductCategory };
    tempProductCategory[name] = e.target.value;
    this.setState({ newProductCategory: tempProductCategory });
  }

  nameChange = e => this.formFieldStringState('name', e);

  formSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newProductCategory };
    this.setState({newProductCategory: defaultProductCategory});
    productCategoryData.postProductCategory(saveMe)
      .then(this.props.update)
      .catch(error => console.error('unable to save productCategory', error));
  }

  render() {
    const { newProductCategory } = this.state;
    return (
      <Form onSubmit={this.formSubmit}>
        <Row form>
          <Col>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                placeholder="ex: Game"
                value={newProductCategory.name}
                onChange={this.nameChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="submit">Add Category</Label>
              <Button id="submit" type="submit" color="primary" className="ml-auto mr-auto d-block">Submit</Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ProductCategoryForm;
