function loadLevelDataUponResponse(data) {
  return {type: 'LOAD_LEVEL_DATA', level: data.level, level_name: data.level_name, prompt: data.prompt, description: data.description, hint_1: data.hint_1, hint_2: data.hint_2, hint_3: data.hint_3, heroic_level_code: data.heroic_level_code, mythic_level_code: data.mythic_level_code, novice_level_code: data.novice_level_code}
};

function getLevelData(text) {
  return function(dispatch) {
    fetch('http://localhost:3000/api/dummydata/levels', {
      method: 'get'
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

export default getLevelData