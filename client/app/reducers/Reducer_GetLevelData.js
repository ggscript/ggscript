const getLevelData = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_LEVEL_DATA':
      console.log(action, 'action from reducer');
      console.log(state, 'state');
      return action.data


    default:
      return state
  }
}

export default getLevelData
