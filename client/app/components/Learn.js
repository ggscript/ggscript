import React from 'react';
import Codemirror from 'react-codemirror';

require('../../../node_modules/codemirror/mode/javascript/javascript.js');
require('../../../node_modules/codemirror/addon/edit/matchbrackets.js');
require('../../../node_modules/codemirror/addon/edit/closebrackets.js');
require('../../../node_modules/codemirror/addon/hint/javascript-hint.js');
require('../../../node_modules/codemirror/addon/hint/show-hint.js');
// require('../../../node_modules/phaser/src/Phaser.js');

export const Sandbox = React.createClass({
  getInitialState: function() {
    return {
      code: "var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create }); \nfunction preload() {\n} \nfunction create() {\n}",
      phaser: "var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create }); \nfunction preload() {\n} \nfunction create() {\n}"
    };
  },
  updateCode: function(newCode) {
    this.setState({
      code: newCode
    });
  },
  loadCode: function() {
  	this.setState({
  		phaser: this.state.code
  	});
  	document.getElementsByTagName('canvas')[0].remove();
  	document.getElementById('gameScript').remove();
  	const script = document.createElement("script");
  	script.text = this.state.code;
  	script.id = 'gameScript';
  	document.getElementById('gameCode').appendChild(script);
  },
  componentDidMount() {
  	const script = document.createElement("script");
  	script.id = 'gameScript';
  	script.text = this.state.code;
  	document.getElementById('gameCode').appendChild(script);
  },
  componentWillUnmount(){
  	document.getElementById('gameScript').remove();
  	document.getElementsByTagName('canvas')[0].remove();
  },
  // renderPhaser: function(){
  // 	document.getElementsByTagName('canvas')[0].remove();
  // 	const script = document.createElement("script");
  // 	script.text = this.state.phaser;
  // 	document.getElementById('gameCode').appendChild(script);
  // },
  render: function() {
    const options = {
      lineNumbers: true,
      mode: 'javascript',
      tabSize: 2,
      // lineWrapping: true,
      matchBrackets: true,
      // autoCloseBrackets: true,
      // styleActiveLine: true,
      theme: 'pastel-on-dark',
    };
    return (
    	<div>
    		<Codemirror value={this.state.code} onChange={this.updateCode} options={options} />
    		<button onClick={this.loadCode}> Load Data </button>
    		<div id="gameCode"></div>
    		<Script phaser={this.state.phaser}/>
    	</div>
    	)
  }
});

export const Script = React.createClass({
	render(){
		return(
			<div></div>
		)
	}
});