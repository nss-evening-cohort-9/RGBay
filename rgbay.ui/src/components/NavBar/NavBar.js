import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Input,
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
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

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
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">RGBay</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
