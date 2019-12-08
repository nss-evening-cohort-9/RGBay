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

firebaseConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component authed={authed} {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component authed={authed} {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  };

  logout = () => {
    this.setState({authenticated: false});
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
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <Router>
          <NavBar authed={authed} logout={this.logout} />
          <div className="container mt-5 mb-5">
            <div className="">
              <Switch>
                <PublicRoute path="/auth" component={Home} authed={authed} />
                {/* <PrivateRoute path="/login" authed={authed} component={Login} /> */}
                <PrivateRoute path="/register" component={Register} authed={authed} />
                <PrivateRoute path="/home" component={Home} authed={authed} />
                <PrivateRoute path="/account" component={Account} authed={authed} />
                <PrivateRoute path="/orders" component={Orders} authed={authed} />
                <PrivateRoute path="/store/:searchCriteria" component={ProductView} authed={authed} isSeller={false} />
                <PrivateRoute path="/store" component={ProductView} authed={authed} isSeller={false} />
                <PrivateRoute path="/product/:productId" component={Product} authed={authed} />
                <PrivateRoute path="/apitest" component={APITest} authed={authed} />
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