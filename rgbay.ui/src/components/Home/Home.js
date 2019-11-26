import React, { Component } from 'react';

import { Jumbotron } from 'reactstrap';

import './Home.scss';

class Home extends Component {
  state = {
    displayValues: []
  }

  render() {
    return (
      <div className="Home col">
        <Jumbotron>
          <h1 className="display-3">Welcome to RGBay!</h1>
          <p className="lead">"We bring the gaming to you!"</p>
          <hr className="my-2" />
          {/* <p>...</p> */}
        </Jumbotron>
      </div>
    );
  }
}

export default Home;