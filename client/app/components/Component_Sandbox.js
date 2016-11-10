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
    console.log(this, 'this')
    this.setState({
      code: newCode
    });
  }

  loadCode() {
  
    document.getElementsByTagName('canvas')[0].remove();
    document.getElementById('gameScript').remove();
    const script = document.createElement("script");
    script.text = this.state.code;
    script.id = 'gameScript';
    document.getElementById('gameCode').appendChild(script);
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
    document.getElementsByTagName('canvas')[0].remove();
  }
  //comment

  render() {
    const options = {
      lineNumbers: true,
      mode: 'javascript',
      tabSize: 2,
      lineWrapping: true,
      matchBrackets: true,
      // autoCloseBrackets: true,
      // styleActiveLine: true,
      theme: 'pastel-on-dark',
    };
    return (
      <div>
        <h1 id='makeVideo'> Phaser Sandbox</h1>
        <Codemirror id="sandboxCode" value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
        <div id="gamebox"></div>
        <div id="gameCode"></div>
        <button onClick={this.loadCode.bind(this)}> Load Data </button>
      </div>
      )
  }
}

export default Sandbox