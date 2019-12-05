import React from 'react';

import './ProductView.scss';

class ProductViewCard extends React.Component {
  state = {
    product: {},
    editState: false,
  }

  showProduct = () => {
    this.props.showProduct(this.props.product.id);
  }

  deleteProduct = () => {
    const { deleteProduct, product } = this.props;
    deleteProduct(product.id)
  }

  updateProduct = () => {
    const { stageEdit, product } = this.props;
    stageEdit(product.id, product);
  }

  render() {
    const { product, isSeller } = this.props;
    const editIcons = isSeller ?
      (<div>
        <i className="fas fa-pencil-alt pointer" onClick={this.updateProduct}></i>
        <i className="fas fa-times pointer pl-2" onClick={this.deleteProduct}></i>
      </div>) : (<div></div>);
    return (
      <div className="ProductViewCard col-12">
        <div className="card pointer" onClick={this.showProduct}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>{product.title}</div>
              {editIcons}
            </div>
            <div>{product.title}</div>
            <div>{product.description}</div>
            <div>{product.rentalPrice}</div>
            <div>{product.salesPrice}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductViewCard;
