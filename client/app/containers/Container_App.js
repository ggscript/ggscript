import React from 'react'
import { Link, hashHistory } from 'react-router'
import { connect } from 'react-redux'
import NavLink from '../components/NavLink'
import { getDisplayName, getProfileData } from '../actions'
import { bindActionCreators } from 'redux';
//makes sure action flows thru reducers

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }
  componentWillMount(){
    this.props.getDisplayName();
    this.setUpProxy();
    this.wakeUpGGShell();
    //if redirected to homepage from login on learn page, send back to learn page
    if(JSON.parse(sessionStorage.getItem('learnLogin'))) {
      console.log('learn login redirect');
      hashHistory.push('learn');
      this.props.getProfileData();

    }
    //if redirected to homepage from login on sandbox page, send back to sandbox page
    if(JSON.parse(sessionStorage.getItem('sandboxLogin'))) {
      console.log('sandbox login redirect');
      hashHistory.push('sandbox');
      this.props.getProfileData();
    }
  }
  componentWillReceiveProps(nextProps) {
    
     //changed the logged in state to true upon reciept of data
     if(!this.state.loggedIn && nextProps.displayname){
      this.setState({loggedIn: true});
     }

     //if the level has change, get the updated point values for navbar
     if(this.props.level !== nextProps.level  && this.state.loggedIn) {
      this.props.getProfileData();
     }
  }
  setUpProxy() {
    var guestDomain = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? 'http://localhost:3001' : 'https://ggshell.herokuapp.com';
    console.log('HOSTNAME GGSCRIPT:', guestDomain);
    window.windowProxy = new Porthole.WindowProxy(guestDomain, "ggshell");
  }

  wakeUpGGShell() {
    fetch('/wakeup').then(result => console.log('GGShell successfully woken')).catch(err => console.log('GGShell unable to be woken', err));
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
              <li><NavLink className="logoStyle" to="/">./ggscript_</NavLink></li>
              <li><NavLink className="navItem" to="/learn">Learn Phaser</NavLink></li>
              <li><NavLink className="navItem" to="/sandbox">Sandbox</NavLink></li>
              <li><NavLink className="navItem" to='/about'>About</NavLink></li>
              <li><NavLink className="navItem" to='/resources'>Resources</NavLink></li>
            </ul>
            {/*right side of nav bar displays username if it exits, or login if it doesn't*/}
            {this.props.displayname ? 
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <NavLink id="profile" to="/profile" className="navItem">Welcome, {this.props.displayname} {this.props.data.points} points </NavLink>
                </li> 
                <li>
                  <a href='#/' data-target ='#logout-modal' data-toggle="modal" className="navItem landing-pg-links"> Log Out </a>
                </li>
              </ul> : 
              <ul className="nav navbar-nav navbar-right"> 
                <li>
                  <a href='#/' data-target = '#login-modal' data-toggle="modal" className="navItem landing-pg-links"> Log In </a>
                </li>
                <li>
                  <a href='#/' data-target = '#signup-modal' data-toggle="modal" className="navItem landing-pg-links"> Sign Up </a>
                </li>
              </ul>}
          </div>
        </nav>
        {this.props.children}
        <br></br>
        <br></br>
        <footer className="footer">
          <div className="container">
            <div className="text-muted text-center footerItem">
              <span className="item">Tech Stack &nbsp;&nbsp;</span><span className="item"> About Us &nbsp;&nbsp;</span><span className="item"> github &nbsp;&nbsp;</span><span className="item">/ggscript_ </span><span className="item"> &nbsp;&nbsp; © 2016 - GGScript | San Francisco CA </span>
            </div>
          </div>
        </footer>
        <br></br>
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log(state, 'map state to props container app')
  return {
    displayname: state.userData.displayname,
    data: state.userData,
    level: state.getLevelData.id
  };
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

