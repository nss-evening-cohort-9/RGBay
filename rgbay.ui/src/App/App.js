import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';

import APITest from '../components/APITest/APITest';
import Register from '../components/Register/Register';
import Home from '../components/Home/Home';
import Account from '../components/Account/Account';
import Orders from '../components/OrderView/OrdersView';
import NavBar from '../components/NavBar/NavBar';
import ProductView from '../components/ProductView/ProductView';
import Product from '../components/Product/Product';

import firebaseConnection from '../requests/connection';

import './App.scss';
import Profile from '../components/Profile/Profile'
import EditUser from '../components/Profile/EditUser';
import SingleUser from '../components/Profile/SingleUser';

firebaseConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component authed={authed} {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component authed={authed} {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    isRegFormFirstLoad: false,
    profile: null,
  };

  logout = () => this.setState({ authed: false, profile: null });

  setProfile = profile => this.setState({ profile });

  setIsRegFormFirstLoadToTrue = () => {
    this.setState({ isRegFormFirstLoad: true });
  }

  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    console.error('test');
    this.removeListener();
  }

  render() {
    const { authed, isRegFormFirstLoad, profile } = this.state;
    return (
      <div className="App">
        <Router>
          <NavBar authed={authed} profile={profile} logout={this.logout} />
          <div className="container mt-5 mb-5">
            <div className="">
              <Switch>
                <PublicRoute path="/auth" component={Home} authed={authed} />
                <PrivateRoute path="/home"
                  component={Home}
                  authed={authed}
                  profile={profile}
                  isRegFormFirstLoad={isRegFormFirstLoad}
                  setIsRegFormFirstLoadToTrue={this.setIsRegFormFirstLoadToTrue}
                  setProfile={this.setProfile} />
                <PrivateRoute path="/register" component={Register} authed={authed} setProfile={this.setProfile} />
                <PrivateRoute path="/account" component={Account} authed={authed} />
                <PrivateRoute path="/orders" component={Orders} authed={authed} />
                <PrivateRoute path="/store/:searchCriteria" component={ProductView} authed={authed} isSeller={false} />
                <PrivateRoute path="/store" component={ProductView} authed={authed} isSeller={false} />
                <PrivateRoute path="/product/:productId" component={Product} authed={authed} />
                <PrivateRoute path="/apitest" component={APITest} authed={authed} />
                <PrivateRoute path="/profile/:id" component={Profile} authed={authed} />
                <PrivateRoute path="/edituser/:id" component={EditUser} authed={authed} />
                <PrivateRoute path="/profileview/:id" component={SingleUser} authed={authed} />
                <Redirect from="*" to="/home" />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;