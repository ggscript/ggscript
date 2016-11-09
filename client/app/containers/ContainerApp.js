import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import NavLink from '../components/NavLink'
import { initializeStore } from '../actions'
import { bindActionCreators } from 'redux';
//makes sure action flows thru reducers


class App extends React.Component {
  componentWillMount(){
    this.props.initializeStore();
    console.log(this, 'this');
  }
  render() {
    return (
      <div>
        <ul role="nav">
          <li><NavLink to="/sampleApp">Sample App</NavLink></li>
          <li><NavLink to="/Home">Home</NavLink></li>
          <li><NavLink to="/learn">Sandbox</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
          <li><NavLink to="/login">Log In</NavLink></li>
          <li><NavLink to="/logout">Log Out</NavLink></li>
        </ul>
        <div>{`these are da props ${this.props.data.username}`}</div>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {data: state.initializeStore};
}

function mapDispatchToProps(dispatch){
  // return bindActionCreators({ initializeStore: initializeStore }, dispatch)
  return {
    initializeStore: () => {
      dispatch(initializeStore())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

