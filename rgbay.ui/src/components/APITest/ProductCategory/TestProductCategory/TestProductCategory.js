import React from 'react';

import './TestProductCategory.scss';
import productCategoryData from '../../../../data/productCategoryData';

class TestProductCategory extends React.Component {

  deleteProductCategory(id) {
    console.error(`trying to delete ${id}`);
    productCategoryData.deleteProductCategory(this.props.productCategory)
      .then(this.props.update)
      .catch(error => console.error('unable to delete ProductCategory', error));
  }

  render() {
    const { productCategory } = this.props;
    return (
      <div className="TestProductCategory col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div className="card">
          <div className="card-body">
            <div>{productCategory.id}</div>
            <div>{productCategory.name}</div>
            <button onClick={() => this.deleteProductCategory(productCategory.id)}>X</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TestProductCategory;
