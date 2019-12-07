import React from 'react';

import './TestProductCategory.scss';

class TestProductCategory extends React.Component {

  deleteProductCategoryEvent = (e) => {
    const { productCategory, deleteProductCategory } = this.props;
    e.preventDefault();
    deleteProductCategory(productCategory.id);
  }

  render() {
    const { productCategory } = this.props;
    return (
      <div className="TestProductCategory col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div className="card">
          <div className="card-body">
            <div>{productCategory.id}</div>
            <div>{productCategory.name}</div>
            <button onClick={this.deleteProductCategoryEvent}>X</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TestProductCategory;
