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

  saveCategory = (e) => {
    e.preventDefault();
    this.props.formSubmit(this.state.newProductCategory);
    this.setState({newProductCategory: defaultProductCategory});
  }

  render() {
    const { newProductCategory } = this.state;
    return (
      <Form onSubmit={this.saveCategory}>
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
