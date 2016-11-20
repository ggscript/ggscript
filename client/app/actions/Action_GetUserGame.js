import {hashHistory} from 'react-router'

function getUserGame(gameid) {
  return function(dispatch) {
    fetch(`api/usergames?id=${gameid}`, {
      method: 'get',
      credentials: "include"
    })
    .then(response => {
      //parse the response and then called the action creator via promise
        response.json().then(res => {
          console.log(res, 'getUserGame response action');
          dispatch({type: 'UPDATE_SANDBOX_CODE', code: res.gamecode});
          hashHistory.push('sandbox');

        })
        .catch(err => {console.log(err)})
      }
    ).catch(err => {
        console.log(err);
    });
  // what you return here gets returned by the dispatch function that used
  // this action creator
  return null;
  };
}

export default getUserGame
