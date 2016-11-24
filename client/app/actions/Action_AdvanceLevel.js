import {getLevelData} from './Action_GetLevelData'//this action creator is called from redux-thunk function (intializeStore)
import { hashHistory } from 'react-router'
//this is a thunk function that called initializeStoreUponResponse when a response is recieved
function advanceLevel(currlevel) {
  return function(dispatch) {
    fetch('/api/advancelevel', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({level: currlevel+1}),
      credentials: "same-origin"
    }).then(response => {
      //parse the response and then called the action creator via promise
        if(response.status === 401) {
          // document.getElementById('login-modal').modal("show");
          // hashHistory.push('login');
        } else {
          dispatch(getLevelData(1));
        }
    }).catch(err => {
        console.log(err);
    });
  // what you return here gets returned by the dispatch function that used
  // this action creator
  return null;
  }
}

export default advanceLevel
