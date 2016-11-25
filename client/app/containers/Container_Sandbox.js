import React from 'react';
import { connect } from 'react-redux'
import Codemirror from 'react-codemirror';
import { getTemplateData, saveGame, getProfileData } from '../actions'
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
      title: undefined,
      mounting: true
    }
  }

  decideAlert() {
    // $('#savealert').hide();
    document.getElementById('savealert').style.display = 'none';
    // $('#loginalert').hide();
    document.getElementById('loginalert').style.display = 'none';
    // $('#titlealert').hide();
    document.getElementById('titlealert').style.display = 'none';
    document.getElementById('lengthalert').style.display = 'none';
    if(this.state.title && this.props.user.id) {
      if(this.state.title.length <= 30){  
        this.props.saveGame(this.props.code, this.state.title);
        document.getElementById('savealert').style.display = 'inline-block';
      }
    }
    if(!this.props.user.id) {
      document.getElementById('loginalert').style.display = 'inline-block';
    }
    if(!this.state.title && this.props.user.id) {
      document.getElementById('titlealert').style.display = 'inline-block';
    }
    if(this.state.title) {
      if(this.state.title.length > 30){
        document.getElementById('lengthalert').style.display = 'inline-block'; 
      }
    }
  }

  hidesave() {
    // $('#savealert').hide();
    document.getElementById('savealert').style.display = 'none';
    // $('#loginalert').hide();
    document.getElementById('loginalert').style.display = 'none';
    // $('#titlealert').hide();
    document.getElementById('titlealert').style.display = 'none';
    document.getElementById('lengthalert').style.display = 'none';
  }

  updateTitle(newTitle) {
    this.setState({
      title: document.getElementById('title').value
    })
    console.log(this.props, "ALL");
  }


  loadCode() {
    //generate and append new script
    this.generateAndSendScript();
  }

  generateAndSendScript() {
    console.log('sending script from container sandbox', this.props.code)
    windowProxy.post({script: this.props.code, learn: false, sandbox: true});
  }

  componentWillMount() {
    var component = this;
    this.props.getTemplateData();
    //check for a query string, if one exists, fetch the game
    if(location.hash.split('?game=')[1]) {
      var hash = location.hash.split('?game=')[1];
      fetch(`/api/sharedgames?game=${hash}`)
      .then(result => {
        result.json()
        .then(res => {
          component.props.updateCode(res.gamecode);
        })
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err));
    }
    console.log('BEFORE SANDBOX MT: ', this);
  }

  componentDidMount() {
    //iframe must load before sending script, or else the iframe will keep executing script from previous page (when switching from sandbox to learn)
    var component = this;
    document.getElementById('ggshell').onload = function() {
      if(component.state.mounting) {
        component.loadCode();
        component.setState({mounting: false});
      }
    }
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
        <div className="sandColor">
        <div className="row">
            <h1 className="sandTitle" id='makeVideo'> Phaser Sandbox </h1>
          </div>
        </div>
        <div onClick={this.hidesave} className="alert alert-success input-group" id="savealert" role="alert">
            <strong>Well done!</strong> You successfully saved your game!.
        </div>
        <div onClick={this.hidesave} className="alert alert-danger input-group" id="loginalert" role="alert">
            <strong>Oh no!</strong> You need to log in to save your game!
        </div>
        <div onClick={this.hidesave} className="alert alert-danger input-group" id="titlealert" role="alert">
            <strong>Oh no!</strong> You need a title if you want to save your game!
        </div>
        <div onClick={this.hidesave} className="alert alert-danger input-group" id="lengthalert" role="alert">
            <strong>Oh no!</strong> Your title is too long - it must be less than 30 characters!
        </div>
        <div id="moveright">
        <Codemirror value={this.props.code} onChange={this.props.updateCode.bind(this)} options={options} />
        <div id='sandboxrightside'>
          <iframe src={(location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? 'http://localhost:3001' : 'https://ggshell.herokuapp.com'} id="ggshell" name="ggshell" scrolling="no"></iframe>
        <div className="input-group input-grout-lg col-md-8 col-md-offset-2">
          <input className="form-control" id='title' placeholder="Untitled Game" type="text" onChange={this.updateTitle.bind(this)} aria-describedby="sizing-addon1"></input>
        </div>
        <div className="col-md-10 offset-md-1">
        <button id='load' className="btn btn-default" onClick={this.loadCode.bind(this)}>
          Run Game &nbsp;
          <span className=" glyphicon glyphicon-play-circle" aria-hidden="true"></span></button>
        <button className="btn btn-default" onClick={this.decideAlert.bind(this)}> Save &nbsp;  <span className=" glyphicon glyphicon-save" aria-hidden="true"></span></button>
        <div className="btn-group">
          <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Choose a Template
          </button>
          <div className="dropdown-menu">
            <li><a onClick={this.changeTemplate.bind(this, 1)}>Space Game</a></li>
            <li><a onClick={this.changeTemplate.bind(this, 2)}>Side Scroller</a></li>
            <li><a onClick={this.changeTemplate.bind(this, 3)}>Adventure Game</a></li>
          </div>
        </div>
        </div>
        </div>
        </div>
        <div id="gameCode">
        </div>
      </div>
      )
  }
}

function mapStateToProps(state){
  console.log('SANDBOX STATE: ', state)
  return {
    template: state.getTemplateData,
    code: state.updateSandboxCode.sandboxGameCode,
    user: state.userData
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
    },
    getProfileData: () => {
      dispatch(getProfileData());
    }
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(Sandbox);
