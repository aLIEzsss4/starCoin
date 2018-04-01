import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Component
import BitCoinDataContent from './content/index'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          BitCoinData
        </header>
          <BitCoinDataContent />
      </div>
    );
  }
}

export default App;
