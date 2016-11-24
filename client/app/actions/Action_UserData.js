import { hashHistory } from 'react-router'

//this action creator is called from redux-thunk function (intializeStore)
function initializeProfileDataUponResponse(data) {
  return { type: 'INITIALIZE_PROFILE', data };
}

function initializeDisplayNameUponResponse(data) {
  return {type: 'INITIALIZE_DISPLAYNAME', data};
}
//this is a thunk function that called initializeStoreUponResponse when a response is recieved
function getProfileData(text) {
  return function(dispatch) {
    fetch('/api/userdata', {
      method: 'get',
      credentials: "same-origin"
    }).then(response => {
      console.log('initialized', response)
      //parse the response and then called the action creator via promise
        if(response.status === 401) {
          hashHistory.push('login');
        } else {
          response.json().then(res => {
          console.log('initialize store', res);
          dispatch(initializeProfileDataUponResponse(res))}).catch(err => {console.log(err)})  
        }

    }).catch(err => {
        console.log(err);
    });
  // what you return here gets returned by the dispatch function that used
  // this action creator
  return null;
  }
}

function getDisplayName(text) {
  return function(dispatch) {
    fetch('/api/displayname', {
      method: 'get',
      credentials: 'include'
    }).then(response => {
      console.log('displayname initialized', response)
      response.json().then(res => {
        console.log(res, 'getdisplayname action response after json');
        dispatch(initializeDisplayNameUponResponse(res))}).catch(err => {console.log(err)})
    }).catch(err => {
      console.log(err);
    });
    return null;
  }
}

export { getProfileData, getDisplayName }