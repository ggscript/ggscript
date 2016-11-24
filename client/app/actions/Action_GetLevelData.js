function loadLevelDataUponResponse(data) {
  console.log('leveldataresponse', data)
  return {type: 'LOAD_LEVEL_DATA', data}
};

function getLevelData() {
  return function(dispatch) {
    fetch(`api/leveldata`, {
      method: 'get',
      credentials: "same-origin"
    })
    .then(response => {
      //parse the response and then called the action creator via promise
        response.json().then(res => {
          console.log(res, 'getLevelData response action');
          dispatch(loadLevelDataUponResponse(res))
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

export {getLevelData, loadLevelDataUponResponse}
