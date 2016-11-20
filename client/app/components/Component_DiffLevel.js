import React from 'react'

class DiffLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    console.log("in DiffLevel", typeof this.props.completed)
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }


  render() {
    return (
      <div className="col-md-4">
        <span>
          {this.props.level} {this.props.points} <img src={this.props.completed? "./assets/emptystar1.png" : "./assets/fullstar1.png"}></img>
        </span>
      </div>
      )
  }
}

export default DiffLevel
