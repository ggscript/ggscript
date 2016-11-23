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
      title: null
    }
  }

  handleError() {
    const component = this;
    window.onerror = (messageOrEvent, source, lineno, colno, error) => {
      component.setState({
        error_message: messageOrEvent,
        error_source: source,
        error_lineno: lineno,
        error_colno: colno,
        error: error
      });
      //if the window receives any error, stop game and display error
      component.destroyGame();
      component.displayError();
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

  decideAlert() {
    // $('#savealert').hide();
    document.getElementById('savealert').style.display = 'none';
    // $('#loginalert').hide();
    document.getElementById('loginalert').style.display = 'none';
    // $('#titlealert').hide();
    document.getElementById('titlealert').style.display = 'none';
    document.getElementById('lengthalert').style.display = 'none';
    if(this.state.title && this.props.user.id && this.state.title.length <= 30) {
      this.props.saveGame(this.props.code, this.state.title);
      document.getElementById('savealert').style.display = 'inline-block';
    }
    if(!this.props.user.id) {
      document.getElementById('loginalert').style.display = 'inline-block';
    }
    if(this.state.title.length > 30 && this.state.title.length) {
      document.getElementById('lengthalert').style.display = 'inline-block';
    }
    if(!this.state.title && this.props.user.id) {
      document.getElementById('titlealert').style.display = 'inline-block';
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
    //remove any previous error if there is one
    if(this.state.showError) {
      this.setState({showError: false})
    }
    //stop the current game code from running
    this.destroyGame();

    //generate and append new script
    this.generateAndAppendScript();

    //if there is no canvas, display the error page (even if no error has been caught)
    var component = this;
    setTimeout(function() {
      if(!document.getElementsByTagName('canvas').length) {
        component.displayError();
      } 
    }, 500)
  }

  generateAndAppendScript() {
    // remove current game script if there is one
    if(document.getElementById('gameScript')){
      document.getElementById('gameScript').remove();
    }
    //add the new code to the newly created script tag
    const script = document.createElement("script");
    script.text = this.props.code;
    script.id = 'gameScript';
    //run the new script by appending it to DOM
    document.getElementById('gameCode').appendChild(script);
  }

  componentWillMount() {
    this.props.getTemplateData();
    this.handleError();
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
        <div onClick={this.hidesave} className="alert alert-success input-group" id="savealert" role="alert">
            <strong>Well done!</strong> You successfully saved your game!.
        </div>
        <div onClick={this.hidesave} className="alert alert-danger input-group" id="loginalert" role="alert">
            <strong>Oh no!</strong> You need to log in to save your game!.
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
          Run Game &nbsp;  
          <span className=" glyphicon glyphicon-play-circle" aria-hidden="true"></span></button>
        <button className="btn btn-default" onClick={this.decideAlert.bind(this)}> Save &nbsp;  
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
