import React from 'react';
import { connect } from 'react-redux'
import Codemirror from 'react-codemirror';
import { getTemplateData, saveGame } from '../actions'
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
      showError: false,
      gameCode: null,
      title: 'example game'
    }
  }

  displayError() {
    if(document.getElementsByTagName('canvas').length) {
      document.getElementsByTagName('canvas')[0].remove();
    }
    this.setState({showError: true});

  }

  destroyGame() {
    if(window.game) {
      if(window.game.destroy && window.game.state){
        window.game.destroy();
      }
    }
  }

  setUpProxy() {
    var guestDomain = location.hostname === 'localhost' ? "http://localhost:3001" : 'https://ggshell.herokuapp.com';
    console.log('sandbox guestdomain:', guestDomain);
    window.windowProxy = new Porthole.WindowProxy(guestDomain, "ggshell");
  }

  updateTitle(newTitle) {
    this.setState({
      title: document.getElementById('title').value
    })
    console.log(this.state.title);
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
    //generate and append new script
    this.generateAndSendScript();

    //if there is no canvas, display the error page (even if no error has been caught)
    var component = this;
    setTimeout(function() {
      if(!document.getElementsByTagName('canvas').length) {
        component.displayError();
      }
    }, 500)
  }

  generateAndSendScript() {
    windowProxy.post({script: this.props.code});
  }

  componentWillMount() {
    this.props.getTemplateData();
    this.setUpProxy();
    console.log('BEFORE SANDBOX MT: ', this);
  }

  componentDidMount() {
    this.loadCode();
  }

  componentWillUnmount() {
    document.getElementById('gameScript').remove();
    this.destroyGame();
  }



  updateTemplate(id) {
    console.log('UPDATED TEMP: ', this.props.template.template[id]);
    const templates = {};
    for(let obj of this.props.template.template) {
      templates[obj.id] = obj.templatecode;
    }
    this.props.updateCode(templates[id]);
  }

  changeTemplate(id) {
    this.updateTemplate(id);
    console.log(this.state.code, "in changeTemplate")
    console.log("before loadcode");
    console.log("after loadcode");
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
        <Codemirror value={this.props.code} onChange={this.props.updateCode.bind(this)} options={options} />
        <div id='sandboxrightside'>
          <iframe src="http://localhost:3001" id="errorconsole" name="ggshell" scrolling="no"></iframe>

        <div className="input-group input-grout-lg col-md-8 col-md-offset-2">
          <input className="form-control" id='title' placeholder="Untitled Game" type="text" onChange={this.updateTitle.bind(this)} aria-describedby="sizing-addon1"></input>
        </div>
        <div className="col-md-10 col-md-offset-1">
        <button id='load' className="btn btn-default" onClick={this.loadCode.bind(this)}>
          Run Game &nbsp;
          <span className=" glyphicon glyphicon-play-circle" aria-hidden="true"></span></button>
        <button className="btn btn-default" onClick={this.props.saveGame.bind(this, this.props.code, this.state.title)}> Save &nbsp;
          <span className=" glyphicon glyphicon-save" aria-hidden="true"></span></button>
        <div id='dropdown' className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Choose a Template
          </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
           <a className="dropdown-item" onClick={this.changeTemplate.bind(this, 1)}>Space Game</a>
           <a className="dropdown-item" onClick={this.changeTemplate.bind(this, 2)}>Side Scroller</a>
           <a className="dropdown-item" onClick={this.changeTemplate.bind(this, 3)}>Adventure Game</a>
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
  console.log('SANDBOX STATE: ', state)
  return {
    template: state.getTemplateData,
    code: state.updateSandboxCode.sandboxGameCode
  }
}

function matchDispatchToProps(dispatch){
  return { getTemplateData: () => {
      // The only way to update the store is by dispatching the action (must dispatch an object not a fn)
      dispatch(getTemplateData())
    },
    saveGame: (gamecode, title) => {
      dispatch(saveGame(gamecode, title))
    },
    updateCode: (code) => {
      dispatch({type: 'UPDATE_SANDBOX_CODE', code: code});
    }
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(Sandbox);
