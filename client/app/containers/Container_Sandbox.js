import React from 'react';
import { connect } from 'react-redux'
import Codemirror from 'react-codemirror';
import { getTemplateData } from '../actions'
import { bindActionCreators } from 'redux';

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
      showError: false,
      error_message: null,
      error_lineno: null,
      error_colno: null
    }
  }

  updateCode(newCode) {
    console.log(this, 'this')
    this.setState({
      code: newCode
    });
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

    if(!document.getElementsByTagName('canvas').length) {
      this.setState({showError: true});
    } else {
      this.setState({showError: false});
    }
  }

  componentWillMount() {
    this.props.getTemplateData();
    console.log('BEFORE SANDBOX MT: ', this);
  }

  componentDidMount() {
    console.log(this, 'learn this')
    const script = document.createElement("script");
    script.id = 'gameScript';
    script.text = this.state.code;
    document.getElementById('gameCode').appendChild(script);

    var component = this;
    window.onerror = (messageOrEvent, lineno, colno) => {
      component.setState({
        error_message: messageOrEvent,
        error_lineno: lineno,
        error_colno: colno
      });
    }
  }

  componentWillUnmount() {
    document.getElementById('gameScript').remove();
    if(window.game) {
      if(window.game.destroy && window.game.state){
        window.game.destroy();
      }
    }
  }

  updateTemplate() {
    console.log(this.props.template.template[0],' updateTemplate');
    this.setState({
      code: this.props.template.template[0].templatecode
    })
  }

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
        <div id="moveright">
        <Codemirror value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
        <div id='sandboxrightside'>
          <div id="gamebox">
            {this.state.showError ? <div id="errorconsole">
            Oops, you have an error!<br></br>
            {`${this.state.error_message}`}<br></br>
            {`Error Line Number: ${this.state.error_lineno}`}<br></br>
            {`Error Column Number: ${this.state.error_colno}`}<br></br>
            </div> : null}
          </div>
        <div className="col-md-6 col-md-offset-3">
        <button className="btn btn-default" onClick={this.loadCode.bind(this)}> Load Data </button>
        <div id='dropdown' className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Choose a Template
          </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
           <a className="dropdown-item" onClick={this.updateTemplate.bind(this)}>Space Game</a>
           <a className="dropdown-item" onClick={this.updateTemplate.bind(this)}>Side Scroller</a>
           <a className="dropdown-item" onClick={this.updateTemplate.bind(this)}>Adventure Game</a>
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

function mapStateToProps(state){
  console.log('SANDBOX STATE: ', state.getTemplateData)
  return {
    template: state.getTemplateData
  }
}

function matchDispatchToProps(dispatch){
  return { getTemplateData: () => {
    // The only way to update the store is by dispatching the action (must dispatch an object not a fn)
    dispatch(getTemplateData())
  }};
}

export default connect(mapStateToProps, matchDispatchToProps)(Sandbox);
