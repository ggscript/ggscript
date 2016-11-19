import React from 'react';
import { connect } from 'react-redux'
import Codemirror from 'react-codemirror';
import { getTemplateData, saveLevelData } from '../actions'
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
      code: 'var game = new Phaser.Game(600, 450, Phaser.CANVAS, "gamebox", { preload: preload, create: create }); \nfunction preload() {\n} \nfunction create() {\n}',
      showError: false,
      error_message: null,
      error_lineno: null,
      error_colno: null,
      gameCode: null,
      title: 'example game'
    }
  }

  updateCode(newCode) {
    console.log(this, 'this')
    this.setState({
      code: newCode,
      gameCode: newCode
      // title: 'updated title'
    });
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
    console.log("loadcode");
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

  updateTemplate(id) {
    console.log('UPDATED TEMP: ', this.props.template.template[id]);
    const templates = {};
    for(let obj of this.props.template.template) {
      templates[obj.id] = obj.templatecode;
    }
    this.setState({
      code: templates[id]
    });
  }

  changeTemplate(id) {
    this.updateTemplate(id);
    console.log(this.state.code, "in changeTemplate")
    console.log("before loadcode");
    this.loadCode();
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

        <div className="input-group input-grout-lg col-md-8 col-md-offset-2">
          <input className="form-control" id='title' placeholder="Untitled Game" type="text" onChange={this.updateTitle.bind(this)} aria-describedby="sizing-addon1"></input>
        </div>
        <div className="col-md-10 col-md-offset-1">
        <button id='load' className="btn btn-default" onClick={this.loadCode.bind(this)}> 
          Load Data &nbsp;  
          <span className=" glyphicon glyphicon-play-circle" aria-hidden="true"></span></button>
        <button className="btn btn-default" onClick={this.props.saveLevelData.bind(this, this.state.code, this.state.title)}> Save &nbsp;  
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
  console.log('SANDBOX STATE: ', state.getTemplateData)
  return {
    template: state.getTemplateData,
    title: state.saveLevelData.title,
    gameCode: state.saveLevelData.gameCode,
  }
}

function matchDispatchToProps(dispatch){
  return { getTemplateData: () => {
    // The only way to update the store is by dispatching the action (must dispatch an object not a fn)
    dispatch(getTemplateData())
  },
  saveLevelData: (gamecode, title) => {
    dispatch(saveLevelData(gamecode, title))
  }
};
}

export default connect(mapStateToProps, matchDispatchToProps)(Sandbox);
