import React from 'react'
import { Link, hashHistory } from 'react-router'
import { connect } from 'react-redux'
import NavLink from '../components/NavLink'
import { getProfileData, updateLevel, getUserGame } from '../actions'

//TODO
//Make User info dynamic to received data

class Profile extends React.Component {

  componentWillMount(){
    this.props.data.savedgames = [];
    this.props.data.levels = [];
    this.props.getProfileData();
  }

   componentDidMount(){
    console.log(this.props.data, 'here is your data');
  }

  render() {
  	return(
  		  <div className="container">
  			<div id='userdata' className="row">
  				<div className="col-sm-4">
  					<div className="profile-userpic">
  					<img className="img-responsive text-center" src={this.props.data.picture}/>
  					</div>
  					<h2 id="username" className="text-center">{this.props.data.displayname}</h2>
  					<h4 className="text-center">{this.props.data.title}</h4>
  					<h4 className="text-center">{this.props.data.points} Points</h4>
            <h4 className="text-center">Current Level: {this.props.data.currlevel}</h4>

  				</div>
  				<div className="col-sm-8">
  					<h1> Your Saved Games! </h1>
            {this.props.data.savedgames.map((title) => <div key={title.id} onClick={this.props.retrieveGame.bind(this, title.id)}id="gameCard"><h3 className="gameTitle"> {title.title} </h3></div>)}
            <h1> Levels </h1>
            {this.props.data.levels.filter(level => level.id <= this.props.data.maxlevel).map(level => <div key={level.id} onClick={this.props.updateLevel.bind(this, false, level.id)}id="gameCard"><h3 className="gameTitle">{level.id} | {level.levelname} | {level.shortdesc}</h3></div>)}
            {this.props.data.levels.filter(level => level.id > this.props.data.maxlevel).map(level => <div key={level.id} id="gameCardIncomp"><h3 className="gameTitleIncomp">{level.id} | {level.levelname} | {level.shortdesc}</h3></div>)}
  				</div>
  			</div>
  		</div>
  	)
  }
}

function mapStateToProps(state){
  return {data: state.userData};
}

function mapDispatchToProps(dispatch){
  return {
    getProfileData: () => {
      dispatch(getProfileData());
    },
    updateLevel(advanceBoolean, currlevel) {
      dispatch(updateLevel(advanceBoolean, currlevel));
      hashHistory.push('learn');
    },
    retrieveGame(gameid) {
      dispatch(getUserGame(gameid));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
