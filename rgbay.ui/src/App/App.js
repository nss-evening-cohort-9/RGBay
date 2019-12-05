import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import APITest from '../components/APITest/APITest';
import Home from '../components/Home/Home';
import Account from '../components/Account/Account';
import Orders from '../components/OrderView/OrdersView';
import NavBar from '../components/NavBar/NavBar';
import ProductView from '../components/ProductView/ProductView';
import './App.scss';


const PublicRoute = ({ component: Component, authed, ...rest }) => {
  // props contains Location, Match, and History
  const routeChecker = props => (authed === false
    ? <Component {...props} {...rest} />
    : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />);
  return <Route render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  // props contains Location, Match, and History
  const routeChecker = props => (authed === true ?
    <Component {...props} {...rest} />
    : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: true,
  };

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <Router>
          <NavBar authed={authed} />
          <div className="container mt-5 mb-5">
            <div className="">
              <Switch>
                {/* <PublicRoute path="/auth" component={Auth} authed={authed} /> */}
                <PrivateRoute path="/home" exact component={Home} authed={authed} />
                <PrivateRoute path="/account" exact component={Account} authed={authed} />
                <PrivateRoute path="/orders" exact component={Orders} authed={authed} />
                <PrivateRoute path="/store" exact component={ProductView} authed={authed} isSeller={false} />
                <PrivateRoute path="/apitest" exact component={APITest} authed={authed} />
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