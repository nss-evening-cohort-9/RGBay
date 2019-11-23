import React, { Component } from 'react';

import './Home.scss';

class Home extends Component {
  state = {
    displayValues: []
  }

  render() {
    return (
      <div className="Home col">
        <ul>
          <li>
            Home
          </li>
        </ul>
      </div>
    );
  }
}

export default Home;