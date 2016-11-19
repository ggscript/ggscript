import React from 'react'

class DiffLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }


  render() {
    return (
      <div className="col-md-4">
        {this.props.level} {this.props.points}
      </div>
      )
  }
}

export default DiffLevel
