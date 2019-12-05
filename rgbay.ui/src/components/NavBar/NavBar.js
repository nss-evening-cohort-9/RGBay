import React from 'react';
import { withRouter } from "react-router";
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Input,
  Form,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import './NavBar.scss';

class NavBar extends React.Component {

  state = {
    isOpen: false,
    search: '',
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  showSearchedProducts = (event) => {
    event.preventDefault();
    this.props.history.push('/store');
  }

  updateSearch = (event) => this.setState({ search: event.target.value });

  render() {
    const { authed } = this.props;
    const buildNavbar = () => {
      if (authed) {
        return (
          <Nav navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to='/home'>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/account'>Account</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/orders'>Orders</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/apitest'>API Test Page</NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav navbar />;
    };

    return (
      <div className="NavBar">
        <Navbar color="dark" dark expand="md" className="row">
          <NavbarBrand className="col-4 text-left" href="/home">RGBay</NavbarBrand>
          <Form className="col-4 w-25" onSubmit={this.showSearchedProducts}>
            <Input placeholder="What you want!" value={this.state.search} onChange={this.updateSearch}/>
          </Form>
          <NavbarToggler onClick={this.toggle} />
          <Collapse className="col-4" style={{flexGrow: 0}} isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavBar);
