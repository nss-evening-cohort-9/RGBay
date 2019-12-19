import React from 'react';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, } from 'reactstrap';

class ProductViewFilters extends React.Component {
  state = {
    purchaseTypeDropdown: false,
    categoryDropdown: false
  }
  togglePurchaseTypeDropdown = () => this.setState({ purchaseTypeDropdown: !this.state.purchaseTypeDropdown });
  toggleCategoryDropdown = () => this.setState({ categoryDropdown: !this.state.categoryDropdown });

  setPurchaseType = (event) => this.props.setPurchaseType(event.target.textContent);
  setCategory = (event) => this.props.setCategory(event.target.textContent);

  render() {
    const categoriesOptions = this.props.categories.map(category => (
      <DropdownItem onClick={this.setCategory}>{category.name}</DropdownItem>
    ));
    return (
      <div>
        <div className="d-flex">
          <Dropdown isOpen={this.state.purchaseTypeDropdown} toggle={this.togglePurchaseTypeDropdown}>
            <DropdownToggle color="dark" caret>{this.props.purchaseType}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.setPurchaseType}>For Rent</DropdownItem>
              <DropdownItem onClick={this.setPurchaseType}>For Sale</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown isOpen={this.state.categoryDropdown} toggle={this.toggleCategoryDropdown}>
            <DropdownToggle color="dark" caret>{this.props.category}</DropdownToggle>
            <DropdownMenu>{categoriesOptions}</DropdownMenu>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default ProductViewFilters;
