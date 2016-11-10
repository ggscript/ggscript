import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import NavLink from '../components/NavLink'
import { initializeStore } from '../actions'

//TODO
//Make User info dynamic to received data

class Profile extends React.Component {
  
  componentWillMount(){
    this.props.initializeStore();
    console.log(this);
  }

  render() {
  	return(
  		  <div className="container">
  			<div id='userdata' className="row">
  				<div className="col-sm-4">
  					<div className="profile-userpic">
  					<img className="img-responsive text-center" src="http://www.tigerfdn.com/wp-content/uploads/2015/05/ever-wonderred-what-do-tigers-eat.jpg"/>
  					</div>
  					<h2 id="username" className="text-center">{this.props.data.username}</h2>
  					<h4 className="text-center">{this.props.data.title}</h4>
  					<h4 className="text-center">{this.props.data.points} Points</h4>
  				</div>
  				<div className="col-sm-8">
  					<h1> Your Saved Games! </h1>
  					<div id="gameCard"> <h3 className="gameTitle"> Cute Panda Sushi Killer </h3> </div>
  					<div id="gameCard"> <h3 className="gameTitle"> Cats in Space </h3> </div>
  					<div id="gameCard"> <h3 className="gameTitle"> Meteor Destroyer - Work in Progress </h3> </div>
  				</div>
  			</div>
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
)(Profile);