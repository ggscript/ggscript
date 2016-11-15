//this action creator is called from redux-thunk function (intializeStore)
function initializeStoreUponResponse(data) {
  return { type: 'INITIALIZE_STORE', data };
}
//this is a thunk function that called initializeStoreUponResponse when a response is recieved
function initializeStore(text) {
  return function(dispatch) {
    fetch('/api/userdata', {
      method: 'get'
    }).then(response => {
      //console.log('initialized', response)
      //parse the response and then called the action creator via promise
        response.json().then(res => {
        // console.log('initialize store', res);
        dispatch(initializeStoreUponResponse(res))}).catch(err => {console.log(err)})

    }).catch(err => {
        console.log(err);
    });
  // what you return here gets returned by the dispatch function that used
  // this action creator
  return null;
  }
}

export default initializeStore