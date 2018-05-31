import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import './font/download/font_689607_1btcyibvuklkrzfr/iconfont.css'

//componment
import DaysContent from './content/daysContent/index'


class App extends Component {

  componentDidMount() {
  }
  render() {
    return (
      <div className="App">
        <div className="App-background"></div>
        <header className="App-header">
          BitCoinData
        </header>
        <div className="Content">
          <DaysContent/>
        </div>
      </div>
    );
  }
}

export default App;
