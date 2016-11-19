import React from 'react'
import Modal from 'react-modal'

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
    top                        : '20%',
    left                       : '20%',
    right                      : '20%',
    bottom                     : '20%',
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


class Hint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      unusedHint: true
    }
  }
  componentWillReceiveProps() {
    //everytime component hint receive new props from container learn, unusedHint state gets reset to true;
    this.setState({
      unusedHint: true
    });
  }
  openModal() {
    this.setState({
      modalIsOpen: true,
      unusedHint: false
    });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <span>
      <img onClick={this.openModal.bind(this)} className="hinthearts" src={this.state.unusedHint ? "./assets/heart.png" : "./assets/emptyheart.png"}></img>
      <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal">

          <h1 ref="subtitle" id="makeVideo"> Here's Your Cheat Code! </h1>
          <h2 id="makeVideo">We hope this helps:</h2>
          <h2 id="makeVideo">{this.props.hint}</h2>
        {/*button for choosing difficulty level*/}
          <br></br>
          <br></br>
          <button id="makeVideo" className="btn btn-default" onClick={this.closeModal.bind(this)}>Ok! Get me back to the code already!</button>
        </Modal>
      </span>
      )
  }
}

export default Hint
