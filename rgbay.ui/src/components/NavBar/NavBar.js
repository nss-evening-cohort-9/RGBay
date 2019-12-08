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

import authRequests from '../../requests/auth';

import './NavBar.scss';

class NavBar extends React.Component {

  state = {
    isOpen: false,
    search: '',
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  // auth
  loginClickEvent = (event) => {
    event.preventDefault();
    authRequests.loginUser()
      .then(() => this.props.history.push('/home'))
      .catch(error => console.error('there was an error in registering', error));
  };

  logoutClickEvent = () => {
    authRequests.logoutUser();
    this.props.logout();
  };

  // navbar product search
  updateSearch = (event) => this.setState({ search: event.target.value });

  showSearchedProducts = (event) => {
    event.preventDefault();
    this.props.history.push(`/store/${this.state.search}`);
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
            <NavItem>
              <NavLink className="pointer" onClick={this.logoutClickEvent} >
                <i className="fab fa-google"></i> Logout
              </NavLink>
            </NavItem>
          </Nav>
        );
      }
      return (
        <Nav navbar>
        <NavItem>
          <NavLink tag={RRNavLink} to='/home'>Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="pointer" onClick={this.loginClickEvent} >
            <i className="fab fa-google"></i> Login
          </NavLink>
        </NavItem>
      </Nav>
      );
    };

    return (
      <div className="NavBar">
        <Navbar color="dark" dark expand="md">
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
