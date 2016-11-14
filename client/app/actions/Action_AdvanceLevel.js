import {getLevelData} from './Action_GetLevelData'//this action creator is called from redux-thunk function (intializeStore)

//this is a thunk function that called initializeStoreUponResponse when a response is recieved
function advanceLevel(currlevel) {
  return function(dispatch) {
    fetch('/api/advancelevel', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({id: 1, level: currlevel+1})
    }).then(response => {
      //parse the response and then called the action creator via promise
        dispatch(getLevelData(1));

    }).catch(err => {
        console.log(err);
    });
  // what you return here gets returned by the dispatch function that used
  // this action creator
  return null;
  }
}

export default advanceLevel