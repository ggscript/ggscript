import React, { Component } from 'react';
import './App.css';
import Sandbox from './components/Sandbox';

class App extends Component {
  render() {
    return (
      <div>
        <h2> Our Awesome Phaser Sandbox - Now more Reacty </h2>
        <Sandbox />
      </div>
    );
  }
}

export default App;
