
function saveGame(gameCode, title) {
  return function(dispatch) {
    fetch(`api/usergames`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: "same-origin",
      body: JSON.stringify({gameCode: gameCode, title: title}),
    })
    .then(response => {
      //parse the response and then called the action creator via promise
        response.json().then(res => {
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
