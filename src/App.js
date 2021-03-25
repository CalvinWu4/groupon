/*global chrome*/

import React, { Component } from 'react';
import logo from './logo.svg';
import attribution from './groupon_powered.png'
import favicon16 from './favicon-16x16.png'
import favicon48 from './favicon-48x48.png'
import favicon128 from './favicon-128x128.png'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.props.isExt ? 
            <img src={chrome.runtime.getURL("static/media/logo.svg")} className="App-logo" alt="logo" />
          :
            <img src={logo} className="App-logo" alt="logo" />
          }

          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
