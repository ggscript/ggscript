function postGameUponResponse(data) {
  console.log('SHARE GAME DATA: ', data);
  return {type: 'SHARE_GAME', data}
}

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
        response.json().then(res => {
          console.log(res, 'shareGame link response');
            dispatch(postGameUponResponse(res));
          if(response.status === 401) {
            console.log('Error posting shared game')
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

export { shareGame, postGameUponResponse }

