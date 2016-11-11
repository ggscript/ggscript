import React from 'react'
import { connect } from 'react-redux'
import { getLevelData } from '../actions'
import Codemirror from 'react-codemirror'
import Modal from 'react-modal'
import { bindActionCreators } from 'redux';
require('../../../node_modules/codemirror/mode/javascript/javascript.js');
require('../../../node_modules/codemirror/addon/edit/matchbrackets.js');
require('../../../node_modules/codemirror/addon/edit/closebrackets.js');
require('../../../node_modules/codemirror/addon/hint/javascript-hint.js');
require('../../../node_modules/codemirror/addon/hint/show-hint.js');

//styling for modal
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
      code: "var game = new Phaser.Game(600, 450, Phaser.CANVAS, 'gamebox', { preload: preload, create: create }); \nfunction preload() {\n} \nfunction create() {\n}",
      modalIsOpen: false
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
    console.log(this, 'this')
    this.setState({
      code: newCode
    });
  }

  startLevel(code, level) {
    var selectedCode = this.props[code];
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

  loadCode() {
  
    document.getElementsByTagName('canvas')[0].remove();
    document.getElementById('gameScript').remove();
    const script = document.createElement("script");
    script.text = this.state.code;
    script.id = 'gameScript';
    document.getElementById('gameCode').appendChild(script);
  }

  componentDidMount() {
    this.setState({
      modalIsOpen: true
    })
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
      <div id="learnbox">
        {/*pop up modal for giving level description before start*/}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal">

          <h1 ref="subtitle">Welcome to Level {this.props.level}!</h1>
          <h2>{this.props.level_name}</h2>
          <h2>Description:</h2>
          <div>{this.props.description}</div>
          <br></br>
          <h3>What difficulty level would you like to complete {this.props.level_name} at?</h3>
        {/*button for choosing difficulty level*/}
          <button onClick={this.startLevel.bind(this, 'novice_level_code', 'Novice')}>Novice</button>
          <button onClick={this.startLevel.bind(this, 'heroic_level_code', 'Heroic')}>Heroic</button>
          <button onClick={this.startLevel.bind(this, 'mythic_level_code', 'Mythic')}>Mythic</button>
        </Modal>
        <div id="prompt">{`Level: ${this.props.level_name} | Difficulty: ${this.state.difficultyLevel} | Mission: ${this.props.prompt}`}
        </div>
        <Codemirror id="tutorialCode"value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
        <div id="learnrightside">
          <div id="gamebox">
          </div>
          <div className="text-center">
            <div id="learnbuttons">
              <button className="btn btn-default padded" onClick={this.loadCode.bind(this)}> Run My Code </button>
              <button className="btn btn-default padded" onClick={this.loadCode.bind(this)}> Next Level </button>
              <button className="btn btn-default padded" onClick={this.loadCode.bind(this)}> Reset Level </button>
            </div>
            <div id="hints">
              <img className="hinthearts" src="./assets/heart.png"></img>
              <img className="hinthearts" src="./assets/heart.png"></img>
              <img className="hinthearts" src="./assets/heart.png"></img>
            </div>
            Use A Hint?
          </div>
        </div>
        <button onClick={this.loadCode.bind(this)}> Load Data </button>
        <div id="gameCode"></div>
      </div>
      )
  }
}

function mapStateToProps(state){
  return {
    level: state.getLevelData.level,
    level_name: state.getLevelData.level_name,
    prompt: state.getLevelData.prompt,
    description: state.getLevelData.description,
    hint_1: state.getLevelData.hint_1,
    hint_2: state.getLevelData.hint_2,
    hint_3: state.getLevelData.hint_3,
    heroic_level_code: state.getLevelData.heroic_level_code,
    mythic_level_code: state.getLevelData.mythic_level_code,
    novice_level_code: state.getLevelData.novice_level_code,
    difficultyLevel: state.getLevelData.difficultyLevel
  }
}

function mapDispatchToProps(dispatch){
  return {
    getLevelData: () => {
      dispatch(getLevelData())
    },
    dispatch: dispatch
  }
}

const Container_Learn = connect(
  mapStateToProps,
  mapDispatchToProps
)(Learn)

export default Container_Learn