import React, { Component } from 'react';

import ProductView from '../ProductView/ProductView';

import './Home.scss';

class Home extends Component {
  state = {
    displayValues: []
  }

  render() {
    const testText = this.props.testText;
    return (
      <div className="Home">
        <h1 className="testTarget">{testText}</h1>
        <button>Button from Home</button>

        <ProductView />
      </div>
    );
  }
}

export default Home;