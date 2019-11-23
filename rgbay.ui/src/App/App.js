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
import NavBar from '../components/NavBar/NavBar';
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
                <PrivateRoute path="/apitest" exact component={APITest} authed={authed} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;