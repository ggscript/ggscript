import React from 'react'
import { Link, hashHistory } from 'react-router'
import { connect } from 'react-redux'
import NavLink from '../components/NavLink'
import { getProfileData, updateLevel, getUserGame, deleteGame, shareGame } from '../actions'

//TODO
//Make User info dynamic to received data

class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currTitle: null
    }
  }

  componentWillMount(){
    this.props.data.savedgames = [];
    this.props.data.levels = [];
    this.props.getProfileData();
  }

  componentDidMount(){
    console.log(this.props.data, 'here is your data');
  }

  deleter(title){
    this.setState ({
      currTitle: title
    })
    console.log(this.props, "State after deleter call");
  }

  combo() {
    this.props.deleteGame(this.state.currTitle);
    this.props.getProfileData();
    console.log('job is done');
  }

  sharer(titleID) {
    this.props.shareGame(titleID);
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
                      <a href="/#/profile" onClick={this.combo.bind(this)} className="btn btn-danger" data-dismiss="modal" aria-label="Close">Delete My Game!</a>
                      <a className="btn btn-success" data-dismiss="modal" aria-label="Close">Nevermind, Keep My Game!</a>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="share-modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="loginmodal-container">
                  <div className="modal-content">
                    <div className="modal-body">
                    <h1 id="makeVideo" className="text-center"> Here's your link: </h1>

                    <div className="col-md-10 offset-md-1">
                    <form className="form-hortizontal" role="form">
                      <div className="form-group">
                        <input type="text" className="form-control" id="modalInput" aria-describedby="sizing-addon1" value={this.props.link.shareGame.link}></input>
                      </div>
                    </form>
                    </div>
                    <br></br>
                    <br></br>
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
            {this.props.data.savedgames.map((title) => <div key={title.id} onClick={this.deleter.bind(this, title.title)} id="gameCard"><h3 onClick={this.props.retrieveGame.bind(this, title.id)} className="gameTitle"> {title.title} </h3> <a data-target = '#delete-modal' data-toggle="modal" className="landing-pg-links"><h4 className="delete">Delete</h4></a>
              <a data-target = '#share-modal' data-toggle="modal" className="landing-pg-links"><h4 onClick={this.sharer.bind(this, title.id)} className="share">Share</h4></a></div>)}
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
  console.log('PROF STATE: ', state);
  return {data: state.userData, link: state};
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
    },
    deleteGame(gameTitle) {
      dispatch(deleteGame(gameTitle));
    },
    shareGame(gameID) {
      dispatch(shareGame(gameID));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
