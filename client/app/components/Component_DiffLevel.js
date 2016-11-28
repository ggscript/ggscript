import React from 'react'

class DiffLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="col-md-4">
        <span>
          {this.props.level} {this.props.points} {this.props.completed? <img id="diffStar" src="./assets/emptystar1.png"></img> : <img id="diffStarFull" src="./assets/fullstar1.png"></img>}
        </span>
      </div>
      )
  }
}

export default DiffLevel
