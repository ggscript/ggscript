const selectTemplate = (template) => {
  console.log('SELECT TEMP', template);
  return {
    type: 'LOAD_TEMPLATE_DATA',
    data: template
  }
}

export default selectTemplate

// return a fn that requests data from db
// follow initialize store action syntax
// the fn that returns the fn with data you need, needs to be exported for your reducer which is a pure fn

// two ways:
  // upon sandbox page load could get all data you need for each template right aaway and store in props
  // change/update state based on which one you need
  // OR can make sep request per template click

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
      //parse the response and then called the action creator via promise
        response.json().then(res => dispatch(initializeStoreUponResponse(res))).catch(err => {console.log(err)})

    }).catch(err => {
        console.log(err);
    });
  // what you return here gets returned by the dispatch function that used
  // this action creator
  return null;
  }
}

export default initializeStore
