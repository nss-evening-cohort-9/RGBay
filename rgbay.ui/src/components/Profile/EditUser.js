import React from 'react';
import axios from 'axios';

const defaultUserInfo = {
  username: '',
  email: '',
  city: '',
  state: '',
  bio: ''
}

const EditUser = () => {
  state = {
    user: [],
    editedUser: defaultUserInfo
  };

  stringStateField = (name, e) => {
    const copyUser = { ...this.state.user };
    copyUser[name] = e.target.value;
    this.ListeningStateChangedEvent({ updatedUser: editedUser });
  };

  //changes the state of the input field
  usernameChange = e => this.stringStateField("name", e);
  emailChange = e => this.stringStateField("email", e);
  cityChange = e => this.stringStateField("city", e);
  stateChange = e => this.stringStateField("state", e);
  bioChange = e => this.stringStateField("bio", e);



  componentDidMount() {
     const userId = 
  }

}

export default EditUser