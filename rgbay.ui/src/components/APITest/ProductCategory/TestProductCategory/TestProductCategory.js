import React from 'react';

import './TestProductCategory.scss';

class TestProductCategory extends React.Component {

  render() {
    const { productCategory } = this.props;
    return (
      <div className="TestProductCategory col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div className="card">
          <div className="card-body">
            <div>{productCategory.id}</div>
            <div>{productCategory.name}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TestProductCategory;
