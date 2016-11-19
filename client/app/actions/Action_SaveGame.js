
function saveGame(gameCode, title) {
  return function(dispatch) {
    fetch(`api/saveleveldata`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: "include",
      body: JSON.stringify({gameCode: gameCode, title: title}),
    })
    .then(response => {
      //parse the response and then called the action creator via promise
        response.JSON().then(res => {
          console.log(res, 'saveLevelData response action');
          // const {data} = getState.reducer();
          // dispatch(saveLevelDataUponResponse(data))
          if(response.status === 401) {
            console.log('error error')
          }
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

export default saveGame