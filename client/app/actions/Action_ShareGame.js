function shareGame(gameID) {
  return function(dispatch) {
    fetch(`api/sharedgames`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: "include",
      body: JSON.stringify({ id: gameID }),
    })
    .then(response => {
      //parse the response and then called the action creator via promise
        response.JSON().then(res => {
          console.log(res, 'shareGame response action');
          if(response.status === 401) {
            console.log('Error Post Share Game')
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

export default shareGame
