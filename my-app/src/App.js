import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

// Component
import BitCoinDataContent from './content/index'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-background"></div>
        <header className="App-header">
          BitCoinData
        </header>
          <BitCoinDataContent/>
      </div>
    );
  }
}

export default App;
