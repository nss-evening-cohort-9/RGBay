import React from 'react';

import productData from '../../data/product-data';

// {
//   "product": {
//     "id": 1,
//     "title": "Corsair Mouse",
//     "category": 0,
//     "rentalPrice": 103200,
//     "salesPrice": 236700,
//     "isForSale": true,
//     "isRgb": true,
//     "description": "This is a cool rgb mouse",
//     "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHPKJOHDk6uKF0_a-pcD4ik_lEPBLd1KyNJMLmYvh3ZXk4J6uTjw&s",
//     "ownerId": 2
//   }
// }

class Product extends React.Component {
  state = {
    product: {},
  }

  getProduct = () => {
    productData.getProductById(this.props.match.params.productId)
      .then(singleProduct => this.setState({ product: singleProduct.data }))
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.getProduct();
  }

  render() {
    const { product } = this.state;
    return (
      <div className="Product">
        <h2>{product.title}</h2>
        <div>category: {product.category}</div>
        <div>rentalPrice: {product.rentalPrice}</div>
        <div>salesPrice: {product.salesPrice}</div>
        <div>isForSale: {product.isForSale}</div>
        <div>isRgb: {product.isRgb}</div>
        <div>description: {product.description}</div>
        <div>imageUrl: {product.imageUrl}</div>
        <div>ownerId: {product.ownerId}</div>
      </div>
    );
  }
}

export default Product;
