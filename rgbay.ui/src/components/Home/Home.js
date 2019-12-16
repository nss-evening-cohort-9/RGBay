import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import ProductView from '../ProductView/ProductView';

import { Jumbotron } from 'reactstrap';

import userData from '../../data/profileData';

import './Home.scss';

class Home extends Component {
  state = {
    displayValues: [],
    products: [],
  }

  showProduct = (productId) => {
    this.props.history.push(`/product/${productId}`);
  }

  profileCheck = () => {
    if (this.props.authed) {
      const { uid } = firebase.auth().currentUser;
      userData.getUserByUid(uid)
        .then(response => {
          if (!response.data && !this.props.isRegFormFirstLoad) {
            this.props.setIsRegFormFirstLoadToTrue();
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
      <div className="Home">
        <Jumbotron className="bg-light">
          <div className="container my-5">
            <h1 className="display-3 my-5">We bring the gaming to you!</h1>
            <hr className="my-2" />
            <p className="lead">"Welcome to RGBay, a platform for all things gaming you can buy!"</p>
          </div>
        </Jumbotron>
        <Jumbotron className="bg-transparent">
          <div className="container">
            <h1 className="display-4">What you want!</h1>
            <p className="lead">- Crazy Earl (Borderlands)</p>
            <hr className="my-2" />
            <p className="lead text-left mb-5">Latest Products</p>
            <ProductView isChildComponent={true} showProduct={this.showProduct} showTitle={false} rows={false} getLatestProductsNum={20} getLatest={true} authed={this.props.authed} />
          </div>
        </Jumbotron>
        
      </div>
    );
  }
}

export default Home;