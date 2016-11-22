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
      <div>
      <div className="modal fade" id="delete-modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="loginmodal-container">
                  <div className="modal-content">
                    <div className="modal-body">
                    <h1 id="makeVideo" className="text-center"> Are You Sure You Want to Delete this Game? </h1>
                    <h3 id="makeVideo" className="text-center">Remember, there's no redo's for this one!</h3>
                    <br></br>
                    <div className="btn-group btn-group-justified">
                      <a href="/auth/google" className="btn btn-danger">Delete My Game!</a>
                      <a href="/auth/google" className="btn btn-success">Nevermind, Keep My Game!</a>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
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
            {this.props.data.savedgames.map((title) => <div key={title.id} id="gameCard"><h3 onClick={this.props.retrieveGame.bind(this, title.id)} className="gameTitle"> {title.title} </h3> <a data-target = '#delete-modal' data-toggle="modal" className="landing-pg-links"><h4 className="delete">Delete</h4></a></div>)}
            <h1> Levels </h1>
            {this.props.data.levels.filter(level => level.id <= this.props.data.maxlevel).map(level => <div key={level.id} onClick={this.props.updateLevel.bind(this, false, level.id)}id="gameCard"><h3 className="gameTitle">{level.id} | {level.levelname} | {level.shortdesc}</h3></div>)}
            {this.props.data.levels.filter(level => level.id > this.props.data.maxlevel).map(level => <div key={level.id} id="gameCardIncomp"><h3 className="gameTitleIncomp">{level.id} | {level.levelname} | {level.shortdesc}</h3></div>)}
  				</div>
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
