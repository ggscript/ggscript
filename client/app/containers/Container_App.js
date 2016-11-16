import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import NavLink from '../components/NavLink'
import { getDisplayName } from '../actions'
import { bindActionCreators } from 'redux';
//makes sure action flows thru reducers

class App extends React.Component {
  componentWillMount(){
    this.setState({navTitle: ''});
    this.props.getDisplayName();
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'these are the next');
    var navTitle= '';
    if(nextProps.data && nextProps.data.displayname) {
      navTitle = "Welcome, "+ nextProps.data.displayname;
      $('#logged').hide();
      if(!nextProps.data.displayname) {
        $('#logout').hide();
        $('#profile').hide();
      }
    }
    this.setState({navTitle: navTitle});
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
            <ul className="nav navbar-nav navbar-right">
              <li><NavLink id="logged" to="/login">Log In</NavLink></li>
              <li><NavLink id="profile" to="/profile">{this.state.navTitle}</NavLink></li>
              <li><NavLink id="logout" to="/logout">Log Out</NavLink></li>
            </ul>
          </div>
        </nav>
        <button onClick={this.props.getDisplayName.bind(this)}>Get Display Name</button>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log(state, 'map state to props container app')
  return {data: state.userData.data};
}

function mapDispatchToProps(dispatch){
  return {
    getDisplayName: () => {
      dispatch(getDisplayName())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

