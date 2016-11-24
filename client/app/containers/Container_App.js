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
    this.setUpProxy();
  }
  componentWillReceiveProps(nextProps) {
                      // <NavLink id="logged" to="/login">Log In</NavLink>
      console.log(nextProps, 'next');
  }
  setUpProxy() {
    var guestDomain = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? 'http://localhost:3001' : 'https://ggshell.herokuapp.com';
    console.log('HOSTNAME GGSCRIPT:', guestDomain);
    window.windowProxy = new Porthole.WindowProxy(guestDomain, "ggshell");
  }

  render() {
    return (
      <div>
          <div className="modal fade" id="login-modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="loginmodal-container">
                  <div className="modal-content">
                    <div className="modal-body">
                    <h1 id="makeVideo" className="text-center">Log into Your Account</h1>
                    <h3 id="makeVideo" className="text-center">Pew Pew, Welcome Back!</h3>
                    <br></br>
                    <div className="btn-group btn-group-justified">
                      <a href="/auth/google" className="btn btn-danger">Google</a>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="signup-modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="loginmodal-container">
                  <div className="modal-content">
                    <div className="modal-body">
                    <h1 id="makeVideo" className="text-center">Sign Up to Learn Phaser!</h1>
                    <h3 id="makeVideo" className="text-center">So, you want to learn how to make your own HTML games?</h3>
                    <br></br>
                    <h4 id="makeVideo" className="text-center">- Learn the basics of Phaser and rack up points in our tutorial.</h4>
                    <h4 id="makeVideo" className="text-center">- Create and save your games easily in the Phaser sandbox.</h4>
                    <h4 id="makeVideo" className="text-center">- Access and share your games from your custom profile.</h4>
                    <br></br>
                    <div className="btn-group btn-group-justified">
                      <a href="/auth/google" className="btn btn-danger">Google</a>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="logout-modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="loginmodal-container">
                  <div className="modal-content">
                    <div className="modal-body">
                    <h1 id="makeVideo" className="text-center">Log Out of your Account</h1>
                    <h3 id="makeVideo" className="text-center">Your mission's not over yet - make sure to report back soon!</h3>
                    <br></br>
                    <div className="btn-group btn-group-justified">
                      <a href="/api/logout" className="btn btn-danger">Log Out</a>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav" role="nav">
              <li><NavLink to="/">GGScript</NavLink></li>
              <li><NavLink to="/learn">Learn Phaser</NavLink></li>
              <li><NavLink to="/sandbox">Sandbox</NavLink></li>
              <li><NavLink to='/about'>About</NavLink></li>
              <li><NavLink to='/resources'>Resources</NavLink></li>
            </ul>
            {/*right side of nav bar displays username if it exits, or login if it doesn't*/}
            {this.props.displayname ? 
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <NavLink id="profile" to="/profile">Welcome, {this.props.displayname} {this.props.data.points} points </NavLink>
                </li> 
                <li>
                  <a href='#/' data-target ='#logout-modal' data-toggle="modal" className="landing-pg-links"> Log Out </a>
                </li>
              </ul> : 
              <ul className="nav navbar-nav navbar-right"> 
                <li>
                  <a href='#/' data-target = '#login-modal' data-toggle="modal" className="landing-pg-links"> Log In </a>
                </li>
                <li>
                  <a href='#/' data-target = '#signup-modal' data-toggle="modal" className="landing-pg-links"> Sign Up </a>
                </li>
              </ul>}
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log(state, 'map state to props container app')
  return {displayname: state.userData.displayname,
    data: state.userData};
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

