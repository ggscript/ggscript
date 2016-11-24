import {getLevelData} from './Action_GetLevelData'//this action creator is called from redux-thunk function (intializeStore)
import { hashHistory } from 'react-router'
//this is a thunk function that called initializeStoreUponResponse when a response is recieved
function updateLevel(advanceBoolean, currlevel) {
  return function(dispatch) {
    fetch('/api/updatelevel', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        advance: advanceBoolean,
        currlevel: currlevel
      }),
      credentials: "same-origin"
    }).then(response => {
      //parse the response and then called the action creator via promise
        if(response.status === 401) {
          $('#login-modal').modal();
        } else {
          dispatch(getLevelData());
        }
    }).catch(err => {
        console.log(err);
    });
  // what you return here gets returned by the dispatch function that used
  // this action creator
  return null;
  }
}

export default updateLevel