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
      code: "var game = new Phaser.Game(600, 450, Phaser.CANVAS, '', { preload: preload, create: create }); \nfunction preload() {\n} \nfunction create() {\n}"
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
  	const script = document.createElement("script");
  	script.id = 'gameScript';
  	script.text = this.state.code;
  	document.getElementById('gameCode').appendChild(script);
  }

  componentWillUnmount() {
  	document.getElementById('gameScript').remove();
  	document.getElementsByTagName('canvas')[0].remove();
  }

  shouldComponentUpdate(){
  	document.getElementsByTagName('canvas').addClass('col-sm-3');
  }

  render() {
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
    		<div className="col-sm-10">
    			<Codemirror value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
    		</div>
    		<button onClick={this.loadCode.bind(this)}> Load Data </button>
    		<div id="gameCode"></div>
    	</div>
    	)
  }
}

export default Sandbox