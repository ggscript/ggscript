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
    this.setState({navTitle: ''})
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.data.username);
    var navTitle= '';
    if(nextProps.data.username) {
      navTitle = "Welcome, "+ nextProps.data.username;
      $('#logged').hide();
    }
    if(!nextProps.data.username) {
      $('#logout').hide();
      $('#profile').hide();
    }
    this.setState({navTitle: navTitle});
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav" role="nav">
              <li><NavLink to="/Home">Home</NavLink></li>
              <li><NavLink to="/sampleApp">Learn Phaser</NavLink></li>
              <li><NavLink to="/learn">Sandbox</NavLink></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><NavLink id="logged" to="/login">Log In</NavLink></li>
              <li><NavLink id="profile" to="/profile">{this.state.navTitle}</NavLink></li>
              <li><NavLink id="logout" to="/logout">Log Out</NavLink></li>
            </ul>
          </div>
        </nav>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

