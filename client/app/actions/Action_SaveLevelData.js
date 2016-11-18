function saveLevelDataUponResponse(data) {
  console.log('leveldataresponse', data)
  return {type: 'SAVE_LEVEL_DATA', userid: data.id, title: data.title, gamecode: data.gameCode}
};

function saveLevelData() {
  return function(dispatch) {
    fetch(`api/saveleveldata`, {
      method: 'get',
      credentials: "include"
    })
    .then(response => {
      //parse the response and then called the action creator via promise
        response.text().then(res => {
          console.log(res, 'saveLevelData response action');
          dispatch(saveLevelDataUponResponse(res))
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

export { saveLevelDataUponResponse, saveLevelData }