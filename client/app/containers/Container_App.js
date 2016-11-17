import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import NavLink from '../components/NavLink'
import { getDisplayName, getProfileData } from '../actions'
import { bindActionCreators } from 'redux';
//makes sure action flows thru reducers

class App extends React.Component {
  componentWillMount(){
    this.props.getDisplayName();
  }
  componentWillReceiveProps(nextProps) {
  
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav" role="nav">
              <li><NavLink to="/">GGScript</NavLink></li>
              <li><NavLink to="/learn">Learn Phaser</NavLink></li>
              <li><NavLink to="/sandbox">Sandbox</NavLink></li>
            </ul>
            {/*right side of nav bar displays username if it exits, or login if it doesn't*/}
            {this.props.displayname ? 
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <NavLink id="profile" to="/profile">Welcome, {this.props.displayname} </NavLink>
                </li> 
                <li>
                  <NavLink id="logout" to="/logout">Log Out</NavLink>
                </li> 
              </ul> : 
              <ul className="nav navbar-nav navbar-right"> 
                <li>
                  <NavLink id="logged" to="/login">Log In</NavLink>
                </li>
              </ul>}
          </div>
        </nav>
        <button onClick={this.props.getDisplayName.bind(this)}>Get Display Name</button>
        <button onClick={this.props.getProfileData.bind(this)}>Get Profile Data</button>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log(state, 'map state to props container app')
  return {displayname: state.userData.displayname};
}

function mapDispatchToProps(dispatch){
  return {
    getDisplayName: () => {
      dispatch(getDisplayName())
    },
    getProfileData: () => {
      dispatch(getProfileData())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

