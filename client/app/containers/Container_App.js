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
                      // <NavLink id="logged" to="/login">Log In</NavLink>

  }

  render() {
    return (
      <div>
          <div className="modal fade" id="login-modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="loginmodal-container">
                  <div className="modal-content">
                    <div className="modal-body">
                    <h1 id="makeVideo" className="text-center">Login to Your Account</h1>
                    <h3 id="makeVideo" className="text-center">Pew Pew, Welcome Back!</h3>
                    <div className="col-md-8 offset-md-2 modal-footer">
                      <div className="btn-group btn-group-justified">
                      <a href="/auth/google" className="btn btn-danger">Google</a>
                    </div>
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
                  <a href='#/' data-target = '#login-modal' data-toggle="modal" className="landing-pg-links"> LOG IN </a>
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

