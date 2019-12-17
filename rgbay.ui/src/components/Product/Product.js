import React from 'react';

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
    return (
      <div className="Product text-left container">
        <div className="row">
          <div className="col-6">
            <img src={product.imageUrl} className="img-fluid" alt="product" />
          </div>

          <div className="col-6">
              <h2>{product.title}</h2>
              <div>by: {seller.username}</div>
              <div>category: {category.name}</div>
              <div>Rent for: ${rentalPrice}/day</div>
              <div>Buy: ${salesPrice}</div>
              <div>isForSale: {product.isForSale}</div>
              <div>isRgb: {product.isRgb}</div>
              <div className="">{product.description}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
