import React from 'react';
import AddToCartForm from '../AddToCartForm/AddToCartForm';
import productData from '../../data/product-data';
import categoryData from '../../data/productCategoryData';
import sellerData from '../../data/profileData';

class Product extends React.Component {
  state = {
    product: {},
    category: {},
    seller: {},
    rentalPrice: 0,
    salesPrice: 0,
  }

  getProductDetails = (product) => {
    this.setState({ product });

    categoryData.getProductCategoryById(product.category)
      .then(categoryData => this.setState({ category: categoryData.data }))
      .catch(error => console.error(error));

    sellerData.getUserById(product.ownerId)
      .then(sellerData => this.setState({ seller: sellerData.data }))
      .catch(error => console.error(error));

    this.setState({ rentalPrice: product.rentalPrice / 100 });
    this.setState({ salesPrice: product.salesPrice / 100 });
  }

  getProduct = () => {
    productData.getProductById(this.props.match.params.productId)
      .then(product => this.getProductDetails(product.data))
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.getProduct();
  }

  render() {
    const { product, category, seller, rentalPrice, salesPrice } = this.state;

    const addToCartForm = <AddToCartForm
      key={`${product.id}_addToCart`}
      productId={product.id}
      rentalPrice={rentalPrice}
      salesPrice={salesPrice}
    />

    return (
      <div className="Product text-left container">
        <div className="card">
          <div className="card-header">
            <h2>{product.title}</h2>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-xs-12 col-md-6 col-xl-5">
                <div className="card">
                  <div className="card-body text-center">
                    <img src={product.imageUrl} className="img-fluid" alt="product" />
                  </div>
                </div>
              </div>

              <div className="ccol-xs-12 col-md-6 col-xl-7">
                <div>Sold By: {seller.username}</div>
                <div>Category: {category.name}</div>
                {rentalPrice > 0 ? <div>Rent for: ${rentalPrice}/day</div> : ''}
                {salesPrice > 0 ? <div>Buy for: ${salesPrice}</div> : ''}
                {/* <div>isForSale: {product.isForSale}</div> */}
                <div>RGB: {product.isRgb ? 'Yup' : 'Nope'}</div>
                <p className="card-text">{product.description}</p>
                <div className="d-flex">
                  {addToCartForm}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
