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


class Hint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      unusedHint: true
    }
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

          <h1 ref="subtitle">Everybody needs a hint sometimes!</h1>
          <h2>We hope this helps:</h2>
          <h2>{this.props.hint}</h2>
        {/*button for choosing difficulty level*/}
          <button onClick={this.closeModal.bind(this)}>Ok! Get me back to the code already!</button>
        </Modal>
        </span>
      )
  }
}

export default Hint
