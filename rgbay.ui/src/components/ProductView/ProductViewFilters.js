import React from 'react';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Input,
  Label } from 'reactstrap';

class ProductViewFilters extends React.Component {
  state = {
    purchaseTypeDropdown: false,
    categoryDropdown: false
  }
  togglePurchaseTypeDropdown = () => this.setState({ purchaseTypeDropdown: !this.state.purchaseTypeDropdown });
  toggleCategoryDropdown = () => this.setState({ categoryDropdown: !this.state.categoryDropdown });

  setPurchaseType = (event) => this.props.setPurchaseType(event.target.textContent);
  setCategory = (event) => this.props.setCategory(Number(event.target.id));
  setIsRgb = (event) => this.props.setIsRgb(event.target.checked);

  render() {
    const { categories, category } = this.props;
    const categoryName = categories.length ? (categories[category -1].name) : ('All');
    const categoriesOptions = this.props.categories.map(category => {
      const mapCategoryName = categories[category.id - 1].name;
      return <DropdownItem key={category.id} id={category.id} onClick={this.setCategory}>{mapCategoryName}</DropdownItem>
    });
    return (
      <div>
        <div className="d-flex">
          <Dropdown className="mr-3" isOpen={this.state.purchaseTypeDropdown} toggle={this.togglePurchaseTypeDropdown}>
            <DropdownToggle color="dark" caret>{this.props.purchaseType}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.setPurchaseType}>All</DropdownItem>
              <DropdownItem onClick={this.setPurchaseType}>For Rent</DropdownItem>
              <DropdownItem onClick={this.setPurchaseType}>For Sale</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown className="mr-3" isOpen={this.state.categoryDropdown} toggle={this.toggleCategoryDropdown}>
            <DropdownToggle color="dark" caret>{categoryName}</DropdownToggle>
            <DropdownMenu>{categoriesOptions}</DropdownMenu>
          </Dropdown>

          <FormGroup check>
            <Label className="mt-2" check>
              <Input type="checkbox" onChange={this.setIsRgb} checked={this.props.isRgb} />RGB Only
            </Label>
          </FormGroup>
        </div>
      </div>
    );
  }
}

export default ProductViewFilters;
