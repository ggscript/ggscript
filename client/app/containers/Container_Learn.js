'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { getLevelData, updateLevel, getLevelPoints, getDisplayName, updatePoints } from '../actions'
import Codemirror from 'react-codemirror'
import Modal from 'react-modal'
import { bindActionCreators } from 'redux';
import Hint from '../components/Component_Hint.js'
import DiffLevel from '../components/Component_DiffLevel.js'
import { Router } from 'react-router'

require('../../../node_modules/codemirror/mode/javascript/javascript.js');
require('../../../node_modules/codemirror/addon/edit/matchbrackets.js');
require('../../../node_modules/codemirror/addon/edit/closebrackets.js');
require('../../../node_modules/codemirror/addon/hint/javascript-hint.js');
require('../../../node_modules/codemirror/addon/hint/show-hint.js');

// Styling for modal
const customStyles = {
  overlay: {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, .5)',
    zIndex            : '10'
  },
  content : {
    position                   : 'absolute',
    top                        : '10%',
    left                       : '10%',
    right                      : '10%',
    bottom                     : '10%',
    border                     : '3px solid #ccc',
    backgroundColor            : 'rgba(255, 255, 255, 1)',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '30px',
    outline                    : 'none',
    padding                    : '50px',
    zIndex                     : '100'
  }
};

class Learn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      mounting: true
    }
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }



  componentWillMount(){
    this.props.getLevelData();
  }

  updateCode(newCode) {
    this.setState({
      code: newCode
    });
  }

  startLevel(code, level) {
    var selectedCode = this.props.levelData[code];
    //load the code base based on the user's selected difficulty level;
    this.setState({
      code: selectedCode,
      difficultyLevel: level
    }, function() {
      //after state has been set (happens asyncronously), load code
      this.loadCode();
    });
    this.closeModal();
    this.loadCode();
  }
  refresh() {
    location.reload();
  }

  generateAndSendScript() {
    // send the script to the ggshell ifream
    windowProxy.post({script: this.state.code});
  }

  loadCode() {
    //generate and append new script
    this.generateAndSendScript();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalIsOpen: true
    })
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

  componentWillUnmount() {
  }

  nextLevel() {
    this.props.updateLevel(true, this.props.levelData.id);
    this.props.updatePoints(this.props.levelData.id, this.state.difficultyLevel);
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
      <div id="learnbox">
        {/*pop up modal for giving level description before start*/}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal">
          <div id='makeVideo'>
          <h1 ref="subtitle">Welcome to Level {this.props.levelData.id}!</h1>
          <h2>{this.props.levelData.levelname}</h2>
          <h3>{this.props.levelData.description_subone}</h3>
          <p id="missionpromptwords2">{this.props.levelData.description_descone}</p>
          <h3>{this.props.levelData.description_subtwo}</h3>
          <p id="missionpromptwords2">{this.props.levelData.description_desctwo}</p>
          <h3>{this.props.levelData.description_subthree}</h3>
          <p id="missionpromptwords2">{this.props.levelData.description_descthree}</p>
          <h3>What difficulty level would you like to complete {this.props.levelData.levelname} at?</h3>
        {/*button for choosing difficulty level*/}
          <button className="btn btn-default difficulty" onClick={this.startLevel.bind(this, 'novicelevelcode', 'Novice')}><DiffLevel level='Novice' completed={this.props.levelData.noviceComplete} points={this.props.levelData.novicepoints}/></button>
          <button className="btn btn-default difficulty" onClick={this.startLevel.bind(this, 'heroiclevelcode', 'Heroic')}><DiffLevel level='Heroic' completed={this.props.levelData.heroicComplete} points={this.props.levelData.heroicpoints}/></button>
          <button className="btn btn-default difficulty" onClick={this.startLevel.bind(this, 'mythiclevelcode', 'Mythic')}><DiffLevel level='Mythic' completed={this.props.levelData.mythicComplete} points={this.props.levelData.mythicpoints}/></button>
          </div>
        </Modal>
        <div id="missionprompt">Your Mission:<span id="missionpromptwords"> {this.props.levelData.prompt}</span></div>
        <span>
        <Codemirror id="tutorialCode"value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
        </span>
        <div id="learnrightside">

          <div id="gamebox">
            <iframe src={location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://ggshell.herokuapp.com'} id="ggshell" name="ggshell" scrolling="no"></iframe>
          </div>
          <div className="text-center">
            <div>
              <span id="prompt">Level:<span id="promptwords"> {this.props.levelData.levelname}</span></span>
             <span id="prompt">Difficulty:<span id="promptwords"> {this.state.difficultyLevel}</span></span>
            </div>
            <div id="learnbuttons">
              <button id="makeVideo" className="btn btn-default padded" onClick={this.loadCode.bind(this)}> Run My Code </button>
              <button id="makeVideo" className="btn btn-default padded" onClick={this.nextLevel.bind(this)}> Next Level </button>
              <button id="makeVideo" className="btn btn-default padded" onClick={this.refresh.bind(this)}> Reset Level </button>
            </div>
            <br></br>
            <div id="hints">
              <Hint hint={this.props.levelData.hint1}/>
              <Hint hint={this.props.levelData.hint2}/>
              <Hint hint={this.props.levelData.hint3}/>
            </div>
            <span id="makeVideo"> Use A Hint? </span>
          </div>
        </div>
        <div id="gameCode"></div>
      </div>
      )
  }
}

function mapStateToProps(state){
  console.log('map state to props learn container', state)
  return {
    levelData: state.getLevelData
  }
}

function mapDispatchToProps(dispatch){
  return {

    getLevelData: () => {
      dispatch(getLevelData())
    },
    dispatch: dispatch,
    updateLevel: (advanceBoolean, currlevel) => {
      dispatch(updateLevel(advanceBoolean, currlevel));
    },
    getLevelPoints: () => {
      dispatch(getLevelPoints());
    },
    updatePoints: (currlevel, difflevel) => {
      dispatch(updatePoints(currlevel, difflevel));
    },
    updateCode: (code) => {
      dispatch({type: 'UPDATE_LEARN_CODE', code: code});
    }

  }
}

const Container_Learn = connect(
  mapStateToProps,
  mapDispatchToProps
)(Learn)

export default Container_Learn
