import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import NavLink from '../components/NavLink'
import { initializeStore } from '../actions'


class App extends React.Component {
  componentWillMount(){
    this.props.initializeStore();
    console.log(this, 'this')
  }
  render() {
    return (
      <div>
        <ul role="nav">
          <li><NavLink to="/sampleApp">Sample App</NavLink></li>
          <li><NavLink to="/Home">Home</NavLink></li>
          <li><NavLink to="/learn">Learn</NavLink></li>
          <li><NavLink to="/sandbox">Sandbox</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
          <li><NavLink to="/login">Log In</NavLink></li>
          <li><NavLink to="/logout">Log Out</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {data: state.initializeStore};
}

function mapDispatchToProps(dispatch){
  return {
    initializeStore: () => {
      dispatch(initializeStore())
    }
  }
}

const containerApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default containerApp