import React from 'react';
import {
  Button
} from 'reactstrap'; 
import './TestProductCategory.scss';

class TestProductCategory extends React.Component {

  deleteProductCategoryEvent = (e) => {
    const { productCategory, deleteProductCategory } = this.props;
    e.preventDefault();
    deleteProductCategory(productCategory.id);
  }

  editProductCategoryEvent = (e) => {
    const { productCategory, editProductCategory } = this.props;
    e.preventDefault();
    editProductCategory(productCategory);
  }

  render() {
    const { productCategory } = this.props;
    return (
      <div className="TestProductCategory col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div className="card">
          <div className="card-body">
            <div>{productCategory.id}</div>
            <div>{productCategory.name}</div>
            <Button outline onClick={this.deleteProductCategoryEvent}><i className="fas fa-times"></i></Button>
            <Button outline onClick={this.editProductCategoryEvent}><i className="fas fa-pencil-alt"></i></Button>
          </div>
        </div>
      </div>
    );
  }
}

export default TestProductCategory;
