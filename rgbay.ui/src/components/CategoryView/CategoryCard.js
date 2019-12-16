import React from 'react';

import './CategoryView.scss';

class CategoryCard extends React.Component {
  state = {
    category: {},
  }

  render() {
    const { category } = this.props;
    return (
      <div className="CategoryCard col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div className="card">
          <div className="card-header">
            <h3>{category.name}</h3>
          </div>
          <div className="card-body">
            <p>{category.name}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryCard;
