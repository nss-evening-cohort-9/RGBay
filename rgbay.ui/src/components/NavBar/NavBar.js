import React from 'react';
import { withRouter } from "react-router";
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
    dropdownOpen: false,
    search: '',
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
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

  toHome = () => this.props.history.push('/home');


  render() {
    const { authed, profile } = this.props;
    const buildNavbar = () => {
      if (authed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to='/home'>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/orders'>Orders</NavLink>
            </NavItem>
            {/* <NavItem> */}
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                <DropdownToggle color="dark" caret nav>
                  {this.props.profile ? (this.props.profile.username) : ('Account')}</DropdownToggle>
                <DropdownMenu>
                  {profile ? (
                    <DropdownItem>
                      <NavItem>
                        <NavLink  tag={RRNavLink} to='/account' className="text-dark p-0">Profile</NavLink>
                      </NavItem>
                    </DropdownItem>
                  ) : (
                    <DropdownItem>
                      <NavItem>
                        <NavLink tag={RRNavLink} to='/register' className="text-dark p-0">Register</NavLink>
                      </NavItem>
                    </DropdownItem>
                  )}
                  <DropdownItem>
                    <NavItem>
                      <NavLink tag={RRNavLink} to='/apitest' className="text-dark p-0">API Test</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink className="text-dark p-0" onClick={this.logoutClickEvent}>Logout</NavLink>
                    </NavItem>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            {/* </NavItem> */}
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
      <Navbar color="dark" dark expand="md">
        <div className="container">
          <NavbarBrand className="col-2-sm col-1-md text-left text-light pointer" onClick={this.toHome}>RGBay</NavbarBrand>
          <Form className="col w-25" onSubmit={this.showSearchedProducts}>
            <Input placeholder="What you want!" value={this.state.search} onChange={this.updateSearch}/>
          </Form>
          <NavbarToggler onClick={this.toggleCollapse} />
          <Collapse className="col-4-md" style={{flexGrow: 0}} isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

export default withRouter(NavBar);
