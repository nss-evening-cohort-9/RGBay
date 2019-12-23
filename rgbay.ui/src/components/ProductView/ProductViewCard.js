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
    const { product, isSeller, productClass, showImage } = this.props;
    const productDateObject = new Date(Date.parse(product.dateCreated));
    const productDate = `${(productDateObject.getMonth() + 1)}/${(productDateObject.getUTCDate())}/${productDateObject.getFullYear()}`;
    // <img src={product.imageUrl} class="card-img h-100" alt="..."></img>
    const productImage = showImage ?
      (<div className="col-md-3 p-3">
        <div className="h-100 w-100" style={{backgroundImage: `url(${product.imageUrl})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain'}}></div>
      </div>) : ('');
    const editIcons = isSeller ?
      (<div>
        <i className="fas fa-pencil-alt pointer" onClick={this.updateProduct}></i>
        <i className="fas fa-times pointer pl-2" onClick={this.deleteProduct}></i>
      </div>) : (<div></div>);
    return (
      <div className={productClass}>
        <div className="card mb-5">
          <div className="row no-gutters">
            {productImage}
            <div className="col">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="pointer font-weight-bold lead" onClick={this.showProduct}>{product.title}</div>
                  {editIcons}
                </div>
                <div className="d-flex justify-content-between">
                  <div className="small"><div>Date Added:</div><div>{productDate}</div></div>
                  <div className="small"><div>RENT | BUY:</div><div>{`$${product.rentalPrice / 100}/day | $${product.salesPrice}`}</div></div>
                </div>
                <hr className="my-2" />
                <div className="lead">{product.description}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductViewCard;
