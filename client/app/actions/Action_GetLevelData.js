function loadLevelDataUponResponse(data) {
  console.log('leveldataresponse', data)
  return {type: 'LOAD_LEVEL_DATA', id: data.id, levelname: data.levelname, prompt: data.prompt, description_subone:data.description_subone, description_descone:data.description_descone, description_subtwo:data.description_subtwo, description_desctwo:data.description_desctwo, description_subthree:data.description_subthree, description_descthree:data.description_descthree, hint1: data.hint1, hint2: data.hint2, hint3: data.hint3, heroiclevelcode: data.heroiclevelcode, mythiclevelcode: data.mythiclevelcode, novicelevelcode: data.novicelevelcode}
};

function getLevelData() {
  return function(dispatch) {
    fetch(`api/leveldata`, {
      method: 'get',
      credentials: "include"
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
