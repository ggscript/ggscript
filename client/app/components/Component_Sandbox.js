import React from 'react';
import Codemirror from 'react-codemirror';

require('../../../node_modules/codemirror/mode/javascript/javascript.js');
require('../../../node_modules/codemirror/addon/edit/matchbrackets.js');
require('../../../node_modules/codemirror/addon/edit/closebrackets.js');
require('../../../node_modules/codemirror/addon/hint/javascript-hint.js');
require('../../../node_modules/codemirror/addon/hint/show-hint.js');

class Sandbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "var game = new Phaser.Game(600, 450, Phaser.CANVAS, 'gamebox', { preload: preload, create: create }); \nfunction preload() {\n} \nfunction create() {\n}",
    }
  }

  updateCode(newCode) {
    if(window.game) {
      window.game.input.keyboard.enabled = false;
    }
    this.setState({
      code: newCode
    });
  }

  loadCode() {
    if(window.game) {
      if(window.game.destroy && window.game.state){
        window.game.destroy();
      }
    }
    document.getElementById('gameScript').remove();
    const script = document.createElement("script");
    script.text = this.state.code;
    script.id = 'gameScript';
    document.getElementById('gameCode').appendChild(script);
  }

  stop() {
    if(window.game.input.keyboard) {
      window.game.input.keyboard.enabled = false;
      console.log(window.game.input.keyboard.enabled);
    }
  }

  go() {
    if(window.game.input.keyboard) {
      window.game.input.keyboard.enabled = true;
      console.log(window.game.input.keyboard.enabled);
    }
  }

  componentDidMount() {
    console.log(this, 'learn this')
    const script = document.createElement("script");
    script.id = 'gameScript';
    script.text = this.state.code;
    document.getElementById('gameCode').appendChild(script);
  }

  componentWillUnmount() {
    document.getElementById('gameScript').remove();
    if(window.game) {
      if(window.game.destroy && window.game.state){
        window.game.destroy();
      }
    }
  }

  activity(){
    if(window.game) {
      window.game.input.enabled = false;
    }
  }

  render() {
    const options = {
      lineNumbers: true,
      mode: 'javascript',
      tabSize: 2,
      lineWrapping: true,
      matchBrackets: true,
      cursorActivity: this.activity,
      // autoCloseBrackets: true,
      // styleActiveLine: true,
      theme: 'pastel-on-dark',
    };
    return (
      <div>
        <h1  id='makeVideo'> Phaser Sandbox</h1>
        <div id="moveright">
        <span onClick={this.stop}>
        <Codemirror onClick={this.go} value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
        </span>
        <div id='sandboxrightside'>
        <div onClick={this.go} id="gamebox"></div>
        <div className="form-group col-md-8 col-md-offset-2">
          <input type="text" className="form-control" placeholder="Game Title" id="usr" />
        </div>
        <div className="col-md-8 col-md-offset-2">
        <button className="btn btn-default" onClick={this.loadCode.bind(this)}> Load Data </button>
        <button className="btn btn-default" onClick={this.loadCode.bind(this)}> Save Game </button>
        <div id='dropdown' className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Choose a Template
          </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
           <a className="dropdown-item" href="#">Space Game</a>
           <a className="dropdown-item" href="#">Side Scroller</a>
           <a className="dropdown-item" href="#">Adventure Game</a>
        </div>
        </div>
        </div>
        </div>
        <div id="gameCode">
        </div>
        </div>
      </div>
      )
  }
}

export default Sandbox