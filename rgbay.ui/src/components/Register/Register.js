import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import profileData from '../../data/profileData';

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
  }

  submitAddUserForm = (event) => {
    event.preventDefault();
    const newProfile = this.state.profile;
    newProfile.firebaseUid = firebase.auth().currentUser.uid;
    this.setState({ profile: defaultProfile });
    profileData.addUser(newProfile)
      .then((response) => {
        this.props.setProfile(response.data);
        this.props.history.push('/home');
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
    const { profile } = this.state;
    return (
      <div className="row justify-content-center pt-5 text-left">
        <Form className="col-6" onSubmit={this.submitAddUserForm}>
          <FormGroup>
            <div className="lead">Looks like you don't have an account yet. Please register below!</div>
          </FormGroup>
          <FormGroup>
            <Label for="user-username">Username</Label>
            <Input type="text" name="username" id="user-username" placeholder="Username" value={profile.username} onChange={this.updateUsername} />
            <Label for="user-email">Email</Label>
            <Input type="email" name="email" id="user-email" placeholder="Email" value={profile.email} onChange={this.updateEmail} />
            <Label for="user-city">City</Label>
            <Input type="text" name="city" id="user-city" placeholder="City" value={profile.city} onChange={this.updateCity} />
            <Label for="user-state">State</Label>
            <Input type="text" name="state" id="user-state" placeholder="Username" value={profile.state} onChange={this.updateState} />
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
