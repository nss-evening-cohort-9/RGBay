import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import { Jumbotron } from 'reactstrap';

import userData from '../../data/profileData';

import './Home.scss';

class Home extends Component {
  state = {
    displayValues: [],
  }

  profileCheck = () => {
    if (this.props.authed) {
      const { uid } = firebase.auth().currentUser;
      userData.getUserByUid(123)
        .then(response => {
          if (!response.data && !this.props.isRegFormFirstLoad) {
            this.props.history.push('/register'); 
          } else {
            this.props.setProfile(response.data);
          }
        })
        .catch(error => console.error(error));
    }

  }

  componentDidMount() {
    this.profileCheck();
  }

  render() {
    return (
      <div className="Home col">
        <Jumbotron>
          <h1 className="display-3">Welcome to RGBay!</h1>
          <p className="lead">"We bring the gaming to you!"</p>
          <hr className="my-2" />
        </Jumbotron>
      </div>
    );
  }
}

export default Home;