import React from 'react'
import { connect } from 'react-redux'
import { getLevelData } from '../actions'
import Codemirror from 'react-codemirror'
import Modal from 'react-modal'
import { bindActionCreators } from 'redux';
import Hint from '../components/Component_Hint.js'

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
      modalIsOpen: false,
      showError: false
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
    const component = this;
    window.onerror = (messageOrEvent, source, lineno, colno, error) => {
      component.setState({
        error_message: messageOrEvent,
        error_source: source,
        error_lineno: lineno,
        error_colno: colno,
        error: error
      });
    }
    this.props.getLevelData();
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

  componentWillReceiveProps(nextProps) {
    console.log('COMP WILL REC PROPS ', nextProps);
  }

  componentDidMount() {
    this.setState({
      modalIsOpen: true
    })
    let descript = this.props.description;
    console.log(this, 'learn this')
    const script = document.createElement("script");
    script.id = 'gameScript';
    script.text = this.state.code;
    document.getElementById('gameCode').appendChild(script);
  }

  componentWillUnmount() {
    if(window.game) {
      if(window.game.destroy && window.game.state) {
        window.game.destroy();
      }
    }
    document.getElementById('gameScript').remove();
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
          <div id='makeVideo'>
          <h1 ref="subtitle">Welcome to Level {this.props.id}!</h1>
          <h2>{this.props.levelname}</h2>
          <h2>Description:</h2>
          <h3>{this.props.description_subone}</h3>
          <p>{this.props.description_descone}</p>
          <h3>{this.props.description_subtwo}</h3>
          <p>{this.props.description_desctwo}</p>
          <h3>{this.props.description_subthree}</h3>
          <p>{this.props.description_descthree}</p>
          <br></br>
          <h3>What difficulty level would you like to complete {this.props.levelname} at?</h3>
        {/*button for choosing difficulty level*/}
          <button className="btn btn-default difficulty" onClick={this.startLevel.bind(this, 'novicelevelcode', 'Novice')}>Novice</button>
          <button className="btn btn-default difficulty" onClick={this.startLevel.bind(this, 'heroiclevelcode', 'Heroic')}>Heroic</button>
          <button className="btn btn-default difficulty" onClick={this.startLevel.bind(this, 'mythiclevelcode', 'Mythic')}>Mythic</button>
          </div>
        </Modal>
        <div id="prompt">Level:<span id="promptwords"> {this.props.levelname}</span></div>
        <div id="prompt">Difficulty:<span id="promptwords"> {this.state.difficultyLevel}</span></div>
        <div id="prompt">Your Mission:<span id="promptwords"> {this.props.prompt}</span></div>
        <span onClick={this.stop}>
        <Codemirror id="tutorialCode"value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
        </span>
        <div id="learnrightside" onClick={this.go}>
          <div id="gamebox">
            {this.state.showError ? <div id="errorconsole">
            Oops, you have an error!<br></br>
            {`${this.state.error_message}`}<br></br>
            {`Error Line Number: ${this.state.error_lineno}`}<br></br>
            {`Error Column Number: ${this.state.error_colno}`}<br></br>
            </div> : null}
          </div>
          <div className="text-center">
            <div id="learnbuttons">
              <button className="btn btn-default padded" onClick={this.loadCode.bind(this)}> Run My Code </button>
              <button className="btn btn-default padded" onClick={this.loadCode.bind(this)}> Next Level </button>
              <button className="btn btn-default padded" onClick={this.loadCode.bind(this)}> Reset Level </button>
            </div>
            <div id="hints">
              <Hint hint={this.props.hint1}/>
              <Hint hint={this.props.hint2}/>
              <Hint hint={this.props.hint3}/>
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
  return {
    id: state.getLevelData.id,
    levelname: state.getLevelData.levelname,
    prompt: state.getLevelData.prompt,
    description_subone:state.getLevelData.description_subone, 
    description_descone:state.getLevelData.description_descone, 
    description_subtwo:state.getLevelData.description_subtwo, 
    description_desctwo:state.getLevelData.description_desctwo, 
    description_subthree:state.getLevelData.description_subthree, 
    description_descthree:state.getLevelData.description_descthree,
    hint1: state.getLevelData.hint1,
    hint2: state.getLevelData.hint2,
    hint3: state.getLevelData.hint3,
    heroiclevelcode: state.getLevelData.heroiclevelcode,
    mythiclevelcode: state.getLevelData.mythiclevelcode,
    novicelevelcode: state.getLevelData.novicelevelcode,
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
