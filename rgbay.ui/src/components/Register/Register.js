import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  Input,
  Label } from 'reactstrap';

import profileData from '../../data/profileData';
import orderProductData from '../../data/orderProductData';

const defaultProfile = {
  username: '',
  email: '',
  city: '',
  state: '',
  bio: '',
}

class Auth extends React.Component {
  state = {
    profile: defaultProfile,
    dropdownOpen: false,
    dropdownSelection: 'TN',
  }

  toggleDropdown = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });
  setDropdownSelection = (event) => this.setState({ dropdownSelection: event.target.textContent });

  submitAddUserForm = (event) => {
    event.preventDefault();
    const newProfile = this.state.profile;
    newProfile.email = firebase.auth().currentUser.email;
    newProfile.state = this.state.dropdownSelection;
    this.setState({ profile: defaultProfile });
    profileData.addUser(newProfile)
      .then((response) => {
        this.props.setProfile(response.data);
        this.props.history.push('/home');
        orderProductData.getCart();
      })
      .catch(error => console.error(error));
  }

  updateProfileForm = (type, event) => {
    const profile = { ...this.state.profile };
    profile[type] = event.target.value;
    this.setState({ profile });
  }

  updateUsername = event => this.updateProfileForm('username', event);
  updateEmail = event => this.updateProfileForm('email', event);
  updateCity = event => this.updateProfileForm('city', event);
  updateState = event => this.updateProfileForm('state', event);
  updateBio = event => this.updateProfileForm('bio', event);

  render() {
    const { profile, dropdownOpen, dropdownSelection } = this.state;
    const geoStatesDropdownItems = profileData.geographicalStates.map(state => (
      <DropdownItem key={state} onClick={this.setDropdownSelection}>{state}</DropdownItem>
    ));
    return (
      <div className="row justify-content-center pt-5 text-left">
        <Form className="col-6" onSubmit={this.submitAddUserForm}>
          <FormGroup>
            <div className="lead">Looks like you don't have an account yet. Please register below!</div>
          </FormGroup>
          <FormGroup>
            <Label for="user-username">Username</Label>
            <Input type="text" name="username" id="user-username" placeholder="Username" value={profile.username} onChange={this.updateUsername} />
            <Label for="user-city">City</Label>
            <Input type="text" name="city" id="user-city" placeholder="City" value={profile.city} onChange={this.updateCity} />
          </FormGroup>
          <FormGroup>
            <Label for="user-state">State</Label>
            <Dropdown isOpen={dropdownOpen} toggle={this.toggleDropdown}>
              <DropdownToggle caret>{dropdownSelection}</DropdownToggle>
              <DropdownMenu>{geoStatesDropdownItems}</DropdownMenu>
            </Dropdown>
          </FormGroup>
          <FormGroup>
            <Label for="user-bio">Bio</Label>
            <Input type="textarea" name="bio" id="user-bio" placeholder="Bio" value={profile.bio} onChange={this.updateBio} />
          </FormGroup>
          <Button type="submit" >Register</Button>
        </Form>
      </div>
    );
  }
}

export default Auth;
