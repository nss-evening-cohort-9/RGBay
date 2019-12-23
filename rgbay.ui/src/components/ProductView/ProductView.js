import React from 'react';

import ProductViewCard from './ProductViewCard';
import ProductForm from './ProductViewForm';
import ProductViewFilters from './ProductViewFilters';

import productData from '../../data/product-data';
import categoryData from '../../data/productCategoryData';

import './ProductView.scss';

const defaultProduct = {
  title: '',
  category: '',
  rentalPrice: '',
  salesPrice: '',
  isForSale: false,
  isRgb: false,
  description: '',
  imageUrl: '',
}

class ProductView extends React.Component {
  state = {
    products: [],
    categories: [],
    product: defaultProduct,
    editState: false,
    purchaseType: 'All',
    category: 5,
    isRgb: false,
  }

  getCategories = () => {
    categoryData.getAllProductCategories()
      .then(categories => {
        const allCategory = {
          id: categories.length + 1,
          name: 'All'
        }
        categories.push(allCategory);
        this.setState({ categories })
      })
      .catch(error => console.error(error));
  }

  setPurchaseType = (value) => this.setState({ purchaseType: value });
  setCategory = (value) => this.setState({ category: value });
  setIsRgb = (value) => this.setState({ isRgb: value });

  showProduct = (productId) => {
    const { isChildComponent, showProduct } = this.props;
    if (isChildComponent) {
      showProduct(productId);
    } else {
      this.props.history.push(`/product/${productId}`);
    }
  }

  submitForm = (event) => {
    event.preventDefault();
    if (this.state.editState) {
      this.editProduct();
    } else {
      this.addProduct();
    }
  }

  stageEdit = (productId, product) => {
    product.id = productId;
    this.setState({ product, editState: true });
  }

  cancelEdit = () => this.setState({ product: defaultProduct, editState: false });

  updateProductForm = (field, event) => {
    const { value, type, checked } = event.target;
    const product = { ...this.state.product };
    product[field] = type === 'text' || type === 'textarea' ? (value) : (checked);
    this.setState({ product });
  }

  updateTitle = event => this.updateProductForm('title', event);
  updateCategory = event => this.updateProductForm('category', event);
  updateRentalPrice = event => this.updateProductForm('rentalPrice', event);
  updateSalesPrice = event => this.updateProductForm('salesPrice', event);
  updateRgb = event => this.updateProductForm('isRgb', event);
  updateIsForSale = event => this.updateProductForm('isForSale', event);
  updateDescription = event => this.updateProductForm('description', event);
  updateImageUrl = event => this.updateProductForm('imageUrl', event);

  filterProducts = (product) => {
    let searchMatch = false;
    let purchaseTypeCheck = false;
    let categoryCheck = false;
    let isRgbCheck = false;

    const { purchaseType, category, isRgb } = this.state;

    if (this.props.match) {
      const { searchCriteria } = this.props.match.params;
      const productTitle = product.title.toLowerCase().replace(/\s+/g, '');
      if (searchCriteria === ' ') searchMatch = true;
      if (productTitle.includes(searchCriteria)) searchMatch = true;
    }

    if (purchaseType !== 'All') {
      if (purchaseType === 'For Sale' && product.isForSale) purchaseTypeCheck = true;
      if (purchaseType === 'For Rent' && product.rentalPrice) purchaseTypeCheck = true;
    } else purchaseTypeCheck = true;

    if (category !== 5) {
      console.error(category, product.category);
      if (category === product.category) categoryCheck = true;
    } else categoryCheck = true;

    if (isRgb === product.isRgb) isRgbCheck = true;

    console.error(searchMatch, purchaseTypeCheck, categoryCheck, isRgbCheck);

    if (searchMatch && purchaseTypeCheck && categoryCheck && isRgbCheck) {
      return true;
    } else return false;
  }

  buildProducts = () => {
    /* eslint-disable array-callback-return */
    const productClass = this.props.rows ? ('ProductViewCard col-12') : ('ProductViewCard col-4');
    return this.state.products.map((product) => {
    const productToBuild = (
      <ProductViewCard
        key={product.id}
        product={product}
        deleteProduct={this.deleteProduct}
        stageEdit={this.stageEdit}
        isSeller={this.props.isSeller}
        showProduct={this.showProduct}
        productClass={productClass}
      />);

    if (this.props.showFilters) {
      if (this.filterProducts(product)) return productToBuild;
    } else return productToBuild;
    });
  }

  getProducts = () => {
    if (this.props.getLatest) {
      productData.getLatestProducts(this.props.getLatestProductsNum)
      .then(products => this.setState({ products }))
      .catch(error => console.error(error));
    } else {
      productData.getProducts()
      .then(products => this.setState({ products }))
      .catch(error => console.error(error));
    }
  }

  deleteProduct = (productId) => {
    productData.deleteProduct(productId)
      .then(() => this.getProducts())
      .catch(error => console.log(error));
  }

  addProduct = () => {
    const newProduct = { ...this.state.product };
    this.setState({ product: defaultProduct });
    newProduct.ownerId = 1;
    productData.addProduct(newProduct)
      .then(() => this.getProducts())
      .catch(error => console.error(error));
  }

  editProduct = () => {
    const updatedProduct = { ...this.state.product };
    this.cancelEdit();
    productData.updateProduct(updatedProduct.id, updatedProduct)
      .then(() => this.getProducts())
      .catch(error => console.error(error));
  }

  componentDidMount() {
    if (!this.props.authed) return
    this.getProducts();
    this.getCategories();
  }

  render() {
    const { product, editState, categories, purchaseType, category, isRgb } = this.state;
    const { isSeller, showFilters } = this.props;
    const productSellerForm = isSeller ?
      (<ProductForm 
        product={product}
        editState={editState}
        updateTitle={this.updateTitle}
        updateCategory={this.updateCategory}
        updateRentalPrice={this.updateRentalPrice}
        updateSalesPrice={this.updateSalesPrice}
        updateRgb={this.updateRgb}
        updateIsForSale={this.updateIsForSale}
        updateDescription={this.updateDescription}
        updateImageUrl={this.updateImageUrl}
        cancelEdit={this.cancelEdit}
        submitForm={this.submitForm}
      />) : ('');
      const productFilters = showFilters ?
        (<ProductViewFilters
          setPurchaseType={this.setPurchaseType}
          setCategory={this.setCategory}
          setIsRgb={this.setIsRgb}
          categories={categories}
          purchaseType={purchaseType}
          category={category}
          isRgb={isRgb}
        />) : ('');
    return (
      <div className="ProductView container">
        <div className="mt-3">{(this.props.showTitle ? (<h2 className="d-inline">ProductView</h2>) : (''))}</div>
        <div className="mt-3">{productSellerForm}</div>
        <div className="mt-3">{productFilters}</div>
        <div className="row mt-3">
          {this.buildProducts()}
        </div>
      </div>
    );
  }
}

export default ProductView;
