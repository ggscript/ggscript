import React from 'react'
import { Link } from 'react-router'
import NavLink from './NavLink'


export default React.createClass({
  render() {
    return (
      <div>
        <ul role="nav">
          <li><NavLink to="/sampleApp">Sample App</NavLink></li>
          <li><NavLink to="/Home">Home</NavLink></li>
          <li><NavLink to="/learn">Learn</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
          <li><NavLink to="/login">Log In</NavLink></li>
          <li><NavLink to="/logout">Log Out</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})